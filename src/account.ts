// Signing in and the person's profile. Optional: everything on the phone works without it. Needed to
// put circuits online, like and report.
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, type Profile } from './supabase';

/** The pictures people can have: parts, as on the website's parts panel. Kept in step with the database. */
export const PICTURES = [
  'led-red',
  'led-green',
  'led-yellow',
  'led-blue',
  'led-white',
  'NE555',
  'resistor',
  'cap-ceramic',
  'cap-electrolytic',
  'pot',
  'button',
  'slide-switch',
  '7seg-cc',
  'nano',
  'W65C02S',
] as const;

export const randomPicture = (not?: string): string => {
  const choices = PICTURES.filter((p) => p !== not);
  return choices[Math.floor(Math.random() * choices.length)];
};

export interface Account {
  /** False until the saved sign-in has been read. */
  ready: boolean;
  session: Session | null;
  /** Null when signed out, or signed in but no name picked yet. */
  profile: Profile | null;
}

let current: Account = { ready: !supabase, session: null, profile: null };
const listeners = new Set<(a: Account) => void>();
const tell = (a: Account): void => {
  current = a;
  listeners.forEach((fn) => fn(a));
};

async function loadProfile(session: Session | null): Promise<Profile | null> {
  if (!supabase || !session) return null;
  const { data } = await supabase
    .from('profiles')
    .select('id, username, picture, is_admin, created_at')
    .eq('id', session.user.id)
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

if (supabase) {
  void supabase.auth.getSession().then(async ({ data }) => {
    tell({ ready: true, session: data.session, profile: await loadProfile(data.session) });
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    // Run outside the auth callback: Supabase asks that no other calls are awaited inside it.
    setTimeout(() => void loadProfile(session).then((profile) => tell({ ready: true, session, profile })), 0);
  });
}

export const getAccount = (): Account => current;

/** Calls `fn` whenever the sign-in or the profile changes. */
export function onAccountChange(fn: (a: Account) => void): () => void {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}

export function useAccount(): Account {
  const [a, set] = useState(current);
  useEffect(() => {
    listeners.add(set);
    set(current);
    return () => void listeners.delete(set);
  }, []);
  return a;
}

/** Read the profile again after it changed. */
export async function refreshProfile(): Promise<void> {
  tell({ ...current, profile: await loadProfile(current.session) });
}

const need = () => {
  if (!supabase) throw new Error('The community isn’t set up in this build');
  return supabase;
};

// Sign-in is Google only, with Android's own account picker (@react-native-google-signin): Google
// hands the app an ID token and Supabase trades it for a session, so nobody sees a Supabase address.
// The native module is loaded only when it's used, so a build without it (or without the client ID)
// still runs, signed out.
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

/** Whether this build can sign anyone in. */
export const canSignIn = !!supabase && !!WEB_CLIENT_ID;

type GoogleModule = typeof import('@react-native-google-signin/google-signin');
let google: Promise<GoogleModule> | null = null;
function loadGoogle(): Promise<GoogleModule> {
  if (!WEB_CLIENT_ID) return Promise.reject(new Error('Signing in isn’t set up in this build'));
  google ??= import('@react-native-google-signin/google-signin')
    .then((mod) => {
      // The web client's ID: Google puts it in the ID token, and Supabase checks it there.
      mod.GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
      return mod;
    })
    .catch(() => {
      google = null;
      throw new Error('Signing in isn’t set up in this build');
    });
  return google;
}

/** Signs in with Google; true when it worked, false when the person backed out. */
export async function signInWithGoogle(): Promise<boolean> {
  const sb = need();
  const { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } = await loadGoogle();
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const result = await GoogleSignin.signIn();
    if (!isSuccessResponse(result)) return false;
    const token = result.data.idToken;
    if (!token) throw new Error('Google didn’t sign you in. Try again');
    const { error } = await sb.auth.signInWithIdToken({ provider: 'google', token });
    if (error) throw error;
    return true;
  } catch (e) {
    if (isErrorWithCode(e)) {
      if (e.code === statusCodes.IN_PROGRESS) return false;
      if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        throw new Error('Google Play services aren’t available on this phone');
      throw new Error('Google didn’t sign you in. Check your connection and try again');
    }
    throw e instanceof Error ? e : new Error('Google didn’t sign you in. Try again');
  }
}

/** Forgets the Google account picked, so the next sign-in asks which one again. */
async function forgetGoogle(revoke: boolean): Promise<void> {
  try {
    const { GoogleSignin } = await loadGoogle();
    if (revoke) await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch {
    // Not signed in with Google on this phone, or not set up: nothing to forget.
  }
}

/** Names are plain lower-case letters, digits and underscores, 3 to 20 long (as the database checks). */
export const cleanName = (name: string): string => name.trim().toLowerCase().replace(/\s+/g, '_');
export const nameProblem = (name: string): string | null =>
  /^[a-z0-9_]{3,20}$/.test(name) ? null : 'Use 3 to 20 letters, numbers or _';

/** The first time: a name, and a part picture at random. */
export async function createProfile(name: string): Promise<void> {
  const sb = need();
  const id = current.session?.user.id;
  if (!id) throw new Error('Sign in first');
  const { error } = await sb.from('profiles').insert({ id, username: cleanName(name), picture: randomPicture() });
  if (error) throw error.code === '23505' ? new Error('That name is taken') : error;
  await refreshProfile();
}

export async function changeName(name: string): Promise<void> {
  const id = current.session?.user.id;
  if (!id) throw new Error('Sign in first');
  const { error } = await need()
    .from('profiles')
    .update({ username: cleanName(name) })
    .eq('id', id);
  if (error) throw error.code === '23505' ? new Error('That name is taken') : error;
  await refreshProfile();
}

/** One of PICTURES, picked by the person. Shows at once; saved in the background, and put back if that fails. */
export async function setPicture(picture: string): Promise<void> {
  const id = current.session?.user.id;
  const before = current.profile;
  if (!id || !before || picture === before.picture) return;
  tell({ ...current, profile: { ...before, picture } });
  const { error } = await need().from('profiles').update({ picture }).eq('id', id);
  if (error) {
    if (current.profile?.picture === picture)
      tell({ ...current, profile: { ...current.profile, picture: before.picture } });
    throw error;
  }
}

export async function signOut(): Promise<void> {
  await need().auth.signOut();
  await forgetGoogle(false);
}

/** Removes the account and everything it shared (supabase/functions/delete-account). */
export async function deleteAccount(): Promise<void> {
  const sb = need();
  const { error } = await sb.functions.invoke('delete-account', { method: 'POST' });
  if (error) throw error;
  await sb.auth.signOut({ scope: 'local' });
  await forgetGoogle(true);
}
