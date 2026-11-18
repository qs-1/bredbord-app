// The community: who can open one of the user's circuits, the Community feed, a shared circuit's
// page, likes, reports and people's pages. Keeping circuits in the account is sync.ts.

import { getAccount } from './account';
import {
  createCircuit,
  deleteCircuit,
  freeName,
  getCircuit,
  localOf,
  readCircuit,
  savePicture,
  updateCircuit,
  type CircuitInfo,
  type Visibility,
} from './circuits';
import { fetchPicture, pictureUrl, supabase, type Profile, type RemoteCircuit } from './supabase';
import { push, syncNow } from './sync';

const LIST_COLUMNS =
  'id, owner, link_code, title, description, tags, parts, picture_path, visibility, remix_of, is_remix, like_count, remix_count, created_at, updated_at, maker:profiles!circuits_owner_fkey(username, picture)';

const need = () => {
  if (!supabase) throw new Error('The community isn’t set up in this build');
  return supabase;
};

// Lists of shared circuits (Community, people's pages) drop one the moment it stops being public here,
// without waiting to be reloaded.
const leaving = new Set<(remoteId: string) => void>();
export function onLeftCommunity(fn: (remoteId: string) => void): () => void {
  leaving.add(fn);
  return () => void leaving.delete(fn);
}
const left = (remoteId: string | undefined): void => {
  if (remoteId) leaving.forEach((fn) => fn(remoteId));
};

/**
 * Changes who can open one of the user's circuits ('me' makes it private again), and saves it to the
 * account straight away. Sharing needs a signed-in person with a name. Throws with the reason.
 */
export async function setOnline(id: string, visibility: Visibility): Promise<CircuitInfo | null> {
  const { profile } = getAccount();
  if (visibility !== 'me' && !profile) throw new Error('Sign in first');
  await updateCircuit(id, { visibility });
  if (profile) {
    const doc = await readCircuit(id);
    if (!doc && visibility !== 'me') throw new Error('Put something on it first, so there’s something to share');
    await push(id);
  }
  const now = await getCircuit(id);
  if (visibility !== 'public') left(now?.remote?.id);
  return now;
}

/** Deletes one of the user's circuits, from the phone and the account (now, or once online). */
export async function removeCircuit(id: string): Promise<void> {
  const remote = (await getCircuit(id))?.remote?.id;
  await deleteCircuit(id);
  left(remote);
  void syncNow();
}

/**
 * One of the user's own circuits that isn't on this phone yet: brought down from the account with
 * the rest of them.
 */
export async function keepMine(r: RemoteCircuit): Promise<CircuitInfo> {
  await syncNow();
  const here = await localOf(r.id);
  if (!here) throw new Error('It couldn’t be opened. Are you online?');
  return here;
}

/** Someone's shared circuit, kept on this phone as the user's own remix of it, with its picture. */
export async function remixShared(r: RemoteCircuit): Promise<CircuitInfo> {
  const full = r.doc ? r : await getShared({ id: r.id });
  if (!full?.doc) throw new Error('It couldn’t be opened');
  const info = await createCircuit(await freeName(r.title), full.doc, {
    description: r.description,
    remixOf: { name: r.title, by: r.maker?.username ?? '', remote: r.id },
  });
  const picture = await fetchPicture(pictureUrl(r.picture_path, r.updated_at));
  if (picture) await savePicture(info.id, picture);
  return info;
}

export type FeedSort = 'popular' | 'new' | 'remixed';

/** Public circuits, a page at a time. */
export async function feed(opts: {
  sort: FeedSort;
  tags?: string[];
  search?: string;
  owner?: string;
  page?: number;
}): Promise<RemoteCircuit[]> {
  if (!supabase) return [];
  const size = 24;
  const from = (opts.page ?? 0) * size;
  let q = supabase.from('circuits').select(LIST_COLUMNS).eq('visibility', 'public').eq('hidden', false);
  if (opts.owner) q = q.eq('owner', opts.owner);
  if (opts.tags?.length) q = q.overlaps('tags', opts.tags);
  const search = opts.search?.trim().replace(/[%_,()]/g, ' ');
  if (search) q = q.ilike('title', `%${search}%`);
  const order = opts.sort === 'new' ? 'created_at' : opts.sort === 'remixed' ? 'remix_count' : 'like_count';
  const { data, error } = await q
    .order(order, { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, from + size - 1);
  if (error) throw error;
  return (data ?? []) as unknown as RemoteCircuit[];
}

/** One shared circuit with its document: by id (public, or the user's own), or by a link's code. */
export async function getShared(by: { id?: string; code?: string }): Promise<RemoteCircuit | null> {
  if (!supabase) return null;
  if (by.code) {
    const { data, error } = await supabase.rpc('circuit_by_link', { code: by.code });
    if (error) throw error;
    const row = (data as RemoteCircuit[] | null)?.[0];
    if (!row) return null;
    const { data: maker } = await supabase
      .from('profiles')
      .select('username, picture')
      .eq('id', row.owner)
      .maybeSingle();
    return { ...row, maker: maker as RemoteCircuit['maker'] };
  }
  const { data, error } = await supabase
    .from('circuits')
    .select(`${LIST_COLUMNS}, doc`)
    .eq('id', by.id ?? '')
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as RemoteCircuit | null) ?? null;
}

/** A remix's original, small: its title, maker and picture, if it's still there and can be seen. */
export async function getOriginal(id: string): Promise<RemoteCircuit | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('circuits').select(LIST_COLUMNS).eq('id', id).maybeSingle();
  return (data as unknown as RemoteCircuit | null) ?? null;
}

export async function liked(circuitId: string): Promise<boolean> {
  const uid = getAccount().session?.user.id;
  if (!supabase || !uid) return false;
  const { data } = await supabase
    .from('likes')
    .select('circuit_id')
    .eq('circuit_id', circuitId)
    .eq('user_id', uid)
    .maybeSingle();
  return !!data;
}

export async function setLiked(circuitId: string, on: boolean): Promise<void> {
  const sb = need();
  const uid = getAccount().session?.user.id;
  if (!uid) throw new Error('Sign in first');
  const { error } = on
    ? await sb.from('likes').insert({ circuit_id: circuitId })
    : await sb.from('likes').delete().eq('circuit_id', circuitId).eq('user_id', uid);
  if (error && error.code !== '23505') throw error;
}

export async function report(what: { circuit?: string; profile?: string }, reason: string): Promise<void> {
  const { error } = await need()
    .from('reports')
    .insert({ circuit_id: what.circuit ?? null, profile_id: what.profile ?? null, reason: reason.slice(0, 500) });
  if (error && error.code !== '23505') throw error;
}

export async function profileByName(username: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from('profiles')
    .select('id, username, picture, is_admin, created_at')
    .eq('username', username)
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

/** Moderation (admin only; the database refuses anyone else). */
export async function setHidden(circuitId: string, hide: boolean): Promise<void> {
  const { error } = await need().rpc('set_hidden', { circuit: circuitId, hide });
  if (error) throw error;
}
