// Keeps the signed-in account's circuits and the phone's in step. Every circuit of the account is
// saved there (private ones as 'private', seen by nobody else), so signing in on another phone brings
// them all back. Changes go up a few seconds after they're made; the account's copies come down when
// the person signs in, the app comes back to the front, or My circuits is pulled down.
//
// Signing in: circuits made while signed out join the account. Signing out: they stay on the phone,
// out of sight, until that account signs in again.
import { AppState } from 'react-native';
import { getAccount, onAccountChange, type Account } from './account';
import {
  adopt,
  allCircuits,
  dropDeletedElsewhere,
  fromAccount,
  getCircuit,
  markSynced,
  onCircuitsChange,
  readCircuit,
  readGone,
  readPicture,
  setGone,
  setOwner,
  type Visibility,
} from './circuits';
import { note } from './dialog';
import { autoTags } from './parts';
import { fetchPicture, pictureUrl, supabase } from './supabase';

type Online = 'private' | 'link' | 'public';
export const toOnline = (v: Visibility): Online => (v === 'me' ? 'private' : v);
const fromOnline = (v: string): Visibility => (v === 'link' || v === 'public' ? v : 'me');

const same = (a: string[], b: string[]): boolean => a.length === b.length && a.every((t, i) => t === b[i]);

let pictureCustomColumnMissing = false;
function missingPictureCustomColumn(error: { code?: string; message?: string } | null): boolean {
  return !!error && ['42703', 'PGRST204'].includes(error.code ?? '') && /picture_custom/i.test(error.message ?? '');
}

/** The JPEG's bytes. An ArrayBuffer: on the phone, Supabase's upload sends a Uint8Array as nothing. */
function jpegBytes(dataUrl: string): ArrayBuffer {
  const raw = atob(dataUrl.slice(dataUrl.indexOf(',') + 1));
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out.buffer;
}

/** Who's signed in with a name, the only time anything is saved to an account. */
function signedIn(): { uid: string } | null {
  const { session, profile } = getAccount();
  return supabase && session && profile ? { uid: session.user.id } : null;
}

// One save at a time per circuit. Sharing, leaving the desk and the timed sync can each ask at once;
// two at once for a circuit not in the account yet each added it, so it was shared twice.
const pushing = new Map<string, Promise<void>>();

/**
 * Saves one circuit to the account: its row, then its picture if that changed. Throws with the
 * reason when it couldn't. A circuit with nothing on it yet waits until it has something.
 */
export function push(id: string): Promise<void> {
  const next = (pushing.get(id) ?? Promise.resolve()).catch(() => undefined).then(() => pushOne(id));
  pushing.set(id, next);
  void next.finally(() => pushing.get(id) === next && pushing.delete(id)).catch(() => undefined);
  return next;
}

async function pushOne(id: string): Promise<void> {
  const me = signedIn();
  if (!supabase || !me) throw new Error('Sign in first');
  const sb = supabase;
  const info = await getCircuit(id);
  if (!info || info.owner !== me.uid) return;
  const doc = await readCircuit(id);
  if (!doc) return;
  const rev = info.rev;
  const fields = {
    title: info.name.slice(0, 60) || 'Untitled circuit',
    description: info.description.slice(0, 500),
    tags: (info.tags ?? autoTags(info.parts)).slice(0, 8),
    parts: info.parts,
    doc,
    visibility: toOnline(info.visibility),
  };
  const fieldsWithPictureCustom = { ...fields, picture_custom: info.pictureCustom };
  const writeFields = pictureCustomColumnMissing ? fields : fieldsWithPictureCustom;

  let remote = info.remote?.owner === me.uid ? info.remote : null;
  let stamp = '';
  if (remote) {
    let { data, error } = await sb.from('circuits').update(writeFields).eq('id', remote.id).select('updated_at');
    if (missingPictureCustomColumn(error)) {
      pictureCustomColumnMissing = true;
      ({ data, error } = await sb.from('circuits').update(fields).eq('id', remote.id).select('updated_at'));
    }
    if (error) throw error;
    // Deleted from the account elsewhere while it was changed here: it goes back up as new.
    if (data?.length) stamp = data[0].updated_at as string;
    else remote = null;
  }
  if (!remote) {
    let { data, error } = await sb
      .from('circuits')
      .insert({ ...writeFields, remix_of: info.remixOf?.remote ?? null, is_remix: !!info.remixOf })
      .select('id, link_code, updated_at')
      .single();
    if (missingPictureCustomColumn(error)) {
      pictureCustomColumnMissing = true;
      const legacy = await sb
        .from('circuits')
        .insert({ ...fields, remix_of: info.remixOf?.remote ?? null, is_remix: !!info.remixOf })
        .select('id, link_code, updated_at')
        .single();
      data = legacy.data as typeof data;
      error = legacy.error;
    }
    if (error) throw error;
    if (!data) throw new Error('Circuit could not be saved');
    remote = { id: data.id as string, code: data.link_code as string, owner: me.uid };
    stamp = data.updated_at as string;
  }

  let pictureUp = info.pictureUp;
  if (info.picture !== info.pictureUp || !info.remote) {
    const picture = await readPicture(id);
    if (picture) {
      const path = `${me.uid}/${remote.id}.jpg`;
      const up = await sb.storage
        .from('pictures')
        .upload(path, jpegBytes(picture), { contentType: 'image/jpeg', upsert: true });
      if (!up.error) {
        const { data } = await sb
          .from('circuits')
          .update({ picture_path: path })
          .eq('id', remote.id)
          .select('updated_at')
          .single();
        if (data) stamp = data.updated_at as string;
        pictureUp = info.picture;
      }
    }
  }
  await markSynced(id, rev, { remote, synced: stamp, pictureUp });
}

/** Deletes from the account the circuits deleted on this phone. */
async function flushGone(uid: string): Promise<void> {
  if (!supabase) return;
  const gone = await readGone();
  const left = [];
  for (const g of gone) {
    if (g.owner !== uid) {
      left.push(g);
      continue;
    }
    const { error } = await supabase.from('circuits').delete().eq('id', g.id);
    if (error) left.push(g);
    else await supabase.storage.from('pictures').remove([`${g.owner}/${g.id}.jpg`]);
  }
  if (left.length !== gone.length) await setGone(left);
}

/** Brings down what the account has that the phone doesn't, or has newer. */
async function pull(uid: string): Promise<void> {
  if (!supabase) return;
  const sb = supabase;
  // Recheck on pulls so the flag starts syncing after the migration is applied.
  pictureCustomColumnMissing = false;
  const columns =
    'id, link_code, title, description, tags, parts, picture_path, visibility, remix_of, is_remix, created_at, updated_at';
  let { data, error } = await sb.from('circuits').select(`${columns}, picture_custom`).eq('owner', uid);
  if (missingPictureCustomColumn(error)) {
    pictureCustomColumnMissing = true;
    const legacy = await sb.from('circuits').select(columns).eq('owner', uid);
    data = legacy.data as typeof data;
    error = legacy.error;
  }
  if (error) throw error;
  const rows = data ?? [];
  const mine = (await allCircuits()).filter((c) => c.owner === uid);
  const gone = new Set((await readGone()).map((g) => g.id));
  const online = new Set(rows.map((r) => r.id as string));
  // Synced before, unchanged since, and no longer in the account: deleted on another phone.
  for (const c of mine)
    if (c.remote && c.synced && !c.dirty && !online.has(c.remote.id)) await dropDeletedElsewhere(c.id);

  for (const r of rows) {
    if (gone.has(r.id as string)) continue;
    const here = mine.find((c) => c.remote?.id === r.id);
    if (here && (here.dirty || here.synced === r.updated_at)) continue;
    const { data: full } = await sb.from('circuits').select('doc').eq('id', r.id).single();
    if (!full) continue;
    const picture = await fetchPicture(pictureUrl(r.picture_path as string | null, r.updated_at as string));
    let remixOf = here?.remixOf ?? null;
    if (!remixOf && r.is_remix) {
      const { data: o } = r.remix_of
        ? await sb
            .from('circuits')
            .select('title, maker:profiles!circuits_owner_fkey(username)')
            .eq('id', r.remix_of)
            .maybeSingle()
        : { data: null };
      const original = o as { title: string; maker: { username: string } | null } | null;
      remixOf = {
        name: original?.title ?? 'Original removed',
        by: original?.maker?.username ?? '',
        remote: (r.remix_of as string | null) ?? undefined,
      };
    }
    const tags = r.tags as string[];
    const parts = r.parts as Record<string, number>;
    await fromAccount(here?.id ?? null, {
      name: r.title as string,
      description: r.description as string,
      tags: same(tags, autoTags(parts)) ? null : tags,
      visibility: fromOnline(r.visibility as string),
      remixOf,
      remote: { id: r.id as string, code: r.link_code as string, owner: uid },
      synced: r.updated_at as string,
      owner: uid,
      pictureCustom: pictureCustomColumnMissing ? (here?.pictureCustom ?? false) : r.picture_custom === true,
      doc: full.doc,
      picture,
      created: new Date(r.created_at as string).getTime(),
      changed: new Date(r.updated_at as string).getTime(),
    });
  }
}

async function pushChanged(uid: string): Promise<void> {
  for (const c of await allCircuits()) {
    if (c.owner !== uid || !c.dirty) continue;
    try {
      await push(c.id);
    } catch (e) {
      // A limit or a rule said no: say so once; being offline just waits for next time.
      const text = e instanceof Error ? e.message : '';
      if (/Too many|most circuits/.test(text)) note(text);
      return;
    }
  }
}

let running: Promise<void> | null = null;
let again = false;

/** Everything in step now: deletions, then the account's copies down, then the phone's changes up. */
export function syncNow(): Promise<void> {
  if (running) {
    again = true;
    return running;
  }
  running = (async () => {
    do {
      again = false;
      const me = signedIn();
      if (!me) break;
      try {
        await flushGone(me.uid);
        await pull(me.uid);
        await pushChanged(me.uid);
      } catch {
        // Offline: it catches up next time.
      }
    } while (again);
  })().finally(() => {
    running = null;
  });
  return running;
}

// Changes go up a few seconds after the last one, not at every step of building.
let timer: ReturnType<typeof setTimeout> | undefined;
function pushSoon(): void {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const me = signedIn();
    if (me && !running) void pushChanged(me.uid).catch(() => undefined);
  }, 6000);
}

/** After a circuit changed and the person is done with it for now (leaving the desk): up at once. */
export function syncOnline(id: string): void {
  if (signedIn()) void push(id).catch(() => undefined);
}

// ---------- Following the account ----------

let shownFor: string | null | undefined;
async function follow(a: Account): Promise<void> {
  if (!a.ready) return;
  const uid = a.session?.user.id ?? null;
  if (uid !== shownFor) {
    shownFor = uid;
    if (uid) await adopt(uid);
    setOwner(uid);
  }
  if (uid && a.profile) void syncNow();
}

if (supabase) {
  void follow(getAccount());
  onAccountChange((a) => void follow(a));
  AppState.addEventListener('change', (state) => state === 'active' && void syncNow());
  onCircuitsChange(() => {
    if (signedIn()) pushSoon();
  });
} else setOwner(null);
