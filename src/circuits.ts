// The circuits on this phone ("My circuits"). Each belongs to an account (saved there too, by
// sync.ts) or, when made while signed out, to this phone only. My circuits shows the signed-in
// account's, or the phone's when signed out; the others stay here, out of sight, until their account
// signs in again.
//
// The list (everything but the documents) is one small entry, read to draw the home screen; each
// circuit's document and its picture are entries of their own, read only when wanted.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { partsOf, type PartCounts } from './parts';

/** Who can open a circuit: its owner only, anyone with its link, or everyone (in Community). */
export type Visibility = 'me' | 'link' | 'public';

export interface CircuitInfo {
  id: string;
  name: string;
  description: string;
  /** Tags the user set, or null to use the ones worked out from the parts. */
  tags: string[] | null;
  visibility: Visibility;
  /** Where it was remixed from, if it was: a name and who made it, and the shared original's id. */
  remixOf: { name: string; by: string; remote?: string } | null;
  /** Its copy in the account: the circuit's id there, its link's code, and whose it is. */
  remote: { id: string; code: string; owner: string } | null;
  /** The parts in it by kind, worked out each time it's saved. */
  parts: PartCounts;
  created: number;
  changed: number;
  /** Bumped whenever the picture is retaken, so the home screen knows to read it again. */
  picture: number;
  /** The picture was framed by the person, so it isn't retaken from above when the circuit changes. */
  pictureCustom: boolean;
  /** The account (its user id) that keeps it, or null: made while signed out, on this phone only. */
  owner: string | null;
  /** Changed since it was last saved to the account. */
  dirty: boolean;
  /** Counts its changes, so a save to the account that raced a change leaves it marked changed. */
  rev: number;
  /** The account's copy's updated_at when the two last matched. */
  synced: string | null;
  /** The `picture` stamp last saved to the account. */
  pictureUp: number;
}

const LIST = 'circuits/list';
/** Circuits deleted here whose account copies are still to be deleted (when back online). */
const GONE = 'circuits/gone';
const docKey = (id: string): string => `circuits/doc/${id}`;
const pictureKey = (id: string): string => `circuits/picture/${id}`;

const listeners = new Set<() => void>();
let cache: CircuitInfo[] | null = null;

export function onCircuitsChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}
const tell = (): void => listeners.forEach((fn) => fn());

async function writeList(list: CircuitInfo[]): Promise<void> {
  cache = list;
  await AsyncStorage.setItem(LIST, JSON.stringify(list));
  tell();
}

/** Records from before a field existed get its default. */
function upgrade(c: Partial<CircuitInfo> & { id: string; name: string }): CircuitInfo {
  const now = Date.now();
  return {
    description: '',
    tags: null,
    visibility: 'me',
    remixOf: null,
    remote: null,
    parts: {},
    created: now,
    changed: now,
    picture: 0,
    pictureCustom: false,
    // Shared before accounts kept everything: it's that account's.
    owner: c.remote?.owner ?? null,
    dirty: true,
    rev: 0,
    synced: null,
    pictureUp: 0,
    ...c,
  };
}

async function all(): Promise<CircuitInfo[]> {
  if (!cache) {
    try {
      const raw = JSON.parse((await AsyncStorage.getItem(LIST)) ?? '[]') as CircuitInfo[];
      cache = raw.map(upgrade);
    } catch {
      cache = [];
    }
  }
  return cache;
}

// Whose circuits show: set by sync.ts once the saved sign-in has been read. Until then the list waits,
// so the phone's own circuits don't flash up before the account's.
let owner: string | null = null;
let ownerKnown: () => void = () => undefined;
const ownerReady = new Promise<void>((done) => {
  ownerKnown = done;
  setTimeout(done, 4000);
});

export function setOwner(next: string | null): void {
  owner = next;
  ownerKnown();
  tell();
}
export const currentOwner = (): string | null => owner;

/** The circuits that show: the signed-in account's, or the phone's own when signed out. Newest change first. */
export async function listCircuits(): Promise<CircuitInfo[]> {
  await ownerReady;
  return (await all()).filter((c) => c.owner === owner).sort((a, b) => b.changed - a.changed);
}

/** Every circuit on the phone, whoever's it is. */
export async function allCircuits(): Promise<CircuitInfo[]> {
  return [...(await all())];
}

export async function getCircuit(id: string): Promise<CircuitInfo | null> {
  return (await all()).find((c) => c.id === id) ?? null;
}

/** The user's circuit that is `remoteId` in the account, if it's on this phone. */
export async function localOf(remoteId: string): Promise<CircuitInfo | null> {
  return (await listCircuits()).find((c) => c.remote?.id === remoteId) ?? null;
}

const newId = (): string => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/** A name not already in the list: `base`, then `base 2`, `base 3`… */
export async function freeName(base: string): Promise<string> {
  const taken = new Set((await listCircuits()).map((c) => c.name));
  let name = base;
  for (let n = 2; taken.has(name); n++) name = `${base} ${n}`;
  return name;
}

async function change(id: string, patch: (c: CircuitInfo) => Partial<CircuitInfo>): Promise<void> {
  const list = await all();
  await writeList(list.map((c) => (c.id === id ? { ...c, ...patch(c), dirty: true, rev: c.rev + 1 } : c)));
}

/** A new circuit of the signed-in account (or the phone's): empty (the desk makes the empty document), or holding `doc`. */
export async function createCircuit(
  name: string,
  doc?: unknown,
  extra: Partial<Pick<CircuitInfo, 'description' | 'tags' | 'remixOf'>> = {},
): Promise<CircuitInfo> {
  const now = Date.now();
  const info = upgrade({ id: newId(), name, created: now, changed: now, owner, ...extra, parts: partsOf(doc) });
  if (doc !== undefined) await AsyncStorage.setItem(docKey(info.id), JSON.stringify(doc));
  await writeList([...(await all()), info]);
  return info;
}

/** The circuit's document as saved, or null for one that has never been saved (a new, empty circuit). */
export async function readCircuit(id: string): Promise<unknown | null> {
  const raw = await AsyncStorage.getItem(docKey(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveCircuit(id: string, doc: unknown): Promise<void> {
  await AsyncStorage.setItem(docKey(id), JSON.stringify(doc));
  await change(id, () => ({ changed: Date.now(), parts: partsOf(doc) }));
}

/** Title, description, tags or who can open it. */
export async function updateCircuit(
  id: string,
  patch: Partial<Pick<CircuitInfo, 'name' | 'description' | 'tags' | 'visibility'>>,
): Promise<void> {
  await change(id, () => patch);
}

/** A copy beside it, with its picture; "Name copy". */
export async function duplicateCircuit(id: string): Promise<CircuitInfo | null> {
  const from = await getCircuit(id);
  if (!from) return null;
  const doc = await readCircuit(id);
  const copy = await createCircuit(await freeName(`${from.name} copy`), doc ?? undefined, {
    description: from.description,
    tags: from.tags,
    remixOf: from.remixOf,
  });
  const picture = await readPicture(id);
  if (picture) await savePicture(copy.id, picture, from.pictureCustom);
  return copy;
}

/** `jpeg` is a data URL; `custom` when the person framed it (otherwise it's the automatic one, from above). */
export async function savePicture(id: string, jpeg: string, custom = false): Promise<void> {
  await AsyncStorage.setItem(pictureKey(id), jpeg);
  await change(id, () => ({ picture: Date.now(), pictureCustom: custom }));
}

export function readPicture(id: string): Promise<string | null> {
  return AsyncStorage.getItem(pictureKey(id));
}

/** Deletes it from the phone; its account copy, if it has one, is deleted by sync.ts (now, or once online). */
export async function deleteCircuit(id: string): Promise<void> {
  const c = await getCircuit(id);
  if (c?.remote) await setGone([...(await readGone()), c.remote]);
  await dropCircuit(id);
}

async function dropCircuit(id: string): Promise<void> {
  await AsyncStorage.multiRemove([docKey(id), pictureKey(id)]);
  await writeList((await all()).filter((c) => c.id !== id));
}

// ---------- For sync.ts ----------

export type Gone = NonNullable<CircuitInfo['remote']>;
export async function readGone(): Promise<Gone[]> {
  try {
    return JSON.parse((await AsyncStorage.getItem(GONE)) ?? '[]') as Gone[];
  } catch {
    return [];
  }
}
export async function setGone(list: Gone[]): Promise<void> {
  await AsyncStorage.setItem(GONE, JSON.stringify(list));
}

/** Saved to the account as it was at `rev`: still changed if it changed again meanwhile. */
export async function markSynced(
  id: string,
  rev: number,
  done: Pick<CircuitInfo, 'remote' | 'synced'> & { pictureUp?: number },
): Promise<void> {
  const list = await all();
  await writeList(
    list.map((c) =>
      c.id === id
        ? {
            ...c,
            remote: done.remote,
            synced: done.synced,
            pictureUp: done.pictureUp ?? c.pictureUp,
            dirty: c.rev !== rev,
          }
        : c,
    ),
  );
}

/** Circuits made while signed out join the account that signs in. */
export async function adopt(account: string): Promise<void> {
  const list = await all();
  if (!list.some((c) => c.owner === null)) return;
  await writeList(list.map((c) => (c.owner === null ? { ...c, owner: account, dirty: true, rev: c.rev + 1 } : c)));
}

/** The account was deleted: its circuits go from the phone too. */
export async function forgetAccount(account: string): Promise<void> {
  for (const c of await all()) if (c.owner === account) await dropCircuit(c.id);
  await setGone((await readGone()).filter((g) => g.owner !== account));
}

/** Deleted on another phone: gone from here too, quietly. */
export const dropDeletedElsewhere = dropCircuit;

/** A circuit as the account has it, new to this phone (`id` null) or newer than the phone's copy. */
export async function fromAccount(
  id: string | null,
  data: Pick<
    CircuitInfo,
    'name' | 'description' | 'tags' | 'visibility' | 'remixOf' | 'remote' | 'synced' | 'owner'
  > & {
    doc: unknown;
    picture: string | null;
    created: number;
    changed: number;
  },
): Promise<void> {
  const { doc, picture, ...info } = data;
  const target = id ?? newId();
  await AsyncStorage.setItem(docKey(target), JSON.stringify(doc));
  if (picture) await AsyncStorage.setItem(pictureKey(target), picture);
  const stamp = picture ? Date.now() : 0;
  const list = await all();
  const here = list.find((c) => c.id === target);
  const next: CircuitInfo = {
    ...(here ?? upgrade({ id: target, name: info.name })),
    ...info,
    parts: partsOf(doc),
    picture: picture ? stamp : (here?.picture ?? 0),
    pictureUp: picture ? stamp : (here?.pictureUp ?? 0),
    dirty: false,
  };
  await writeList(here ? list.map((c) => (c.id === target ? next : c)) : [...list, next]);
}
