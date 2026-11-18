// The connection to Bredbord's community (Supabase), with the publishable key only: what people may
// do is decided by the database's rules (supabase/migrations in the main project), not by this app.
//
// The sign-in session is kept encrypted on the phone (SecureStore), split into pieces because each
// stored value can only be about 2 KB.
import 'react-native-url-polyfill/auto';
import { AppState } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const PIECE = 1800;
const safe = (name: string): string => name.replace(/[^A-Za-z0-9._-]/g, '_');

const secureStorage = {
  async getItem(name: string): Promise<string | null> {
    const count = Number(await SecureStore.getItemAsync(`${safe(name)}.n`));
    if (!count) return null;
    let out = '';
    for (let i = 0; i < count; i++) {
      const piece = await SecureStore.getItemAsync(`${safe(name)}.${i}`);
      if (piece === null) return null;
      out += piece;
    }
    return out;
  },
  async setItem(name: string, value: string): Promise<void> {
    await secureStorage.removeItem(name);
    const count = Math.ceil(value.length / PIECE);
    for (let i = 0; i < count; i++)
      await SecureStore.setItemAsync(`${safe(name)}.${i}`, value.slice(i * PIECE, (i + 1) * PIECE));
    await SecureStore.setItemAsync(`${safe(name)}.n`, String(count));
  },
  async removeItem(name: string): Promise<void> {
    const count = Number(await SecureStore.getItemAsync(`${safe(name)}.n`));
    for (let i = 0; i < count; i++) await SecureStore.deleteItemAsync(`${safe(name)}.${i}`);
    await SecureStore.deleteItemAsync(`${safe(name)}.n`);
  },
};

/** Null when the app was built without the community's address (it then works as before, offline). */
export const supabase: SupabaseClient | null =
  URL && KEY
    ? createClient(URL, KEY, {
        auth: {
          storage: secureStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          flowType: 'pkce',
        },
      })
    : null;

// Keep the sign-in fresh only while the app is in front.
if (supabase) {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') void supabase.auth.startAutoRefresh();
    else void supabase.auth.stopAutoRefresh();
  });
}

/** A shared circuit as the database has it. */
export interface RemoteCircuit {
  id: string;
  owner: string;
  link_code: string;
  title: string;
  description: string;
  tags: string[];
  parts: Record<string, number>;
  doc?: unknown;
  picture_path: string | null;
  visibility: 'link' | 'public';
  remix_of: string | null;
  is_remix: boolean;
  like_count: number;
  remix_count: number;
  created_at: string;
  updated_at: string;
  maker?: { username: string; picture: string } | null;
}

export interface Profile {
  id: string;
  username: string;
  picture: string;
  is_admin: boolean;
  created_at: string;
}

/** Where shared circuits open on the web (the website's page for them comes with the website's community). */
export const linkFor = (code: string): string => `https://bredbord.vercel.app/c/${code}`;

/** A shared circuit's picture, by address; `stamp` makes a changed picture load again. */
export function pictureUrl(path: string | null, stamp?: string): string | null {
  if (!supabase || !path) return null;
  const url = supabase.storage.from('pictures').getPublicUrl(path).data.publicUrl;
  return stamp ? `${url}?v=${encodeURIComponent(stamp)}` : url;
}

/** A picture from an address, as a data URL to keep on the phone. */
export async function fetchPicture(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const blob = await (await fetch(url)).blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
