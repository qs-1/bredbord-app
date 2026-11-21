// How high the open bottom sheets reach, so a short note shows above them instead of over their buttons.

const floors = new Map<number, number>();
const listeners = new Set<() => void>();
let nextKey = 1;

/** A key for one sheet's height. */
export const floorKey = (): number => nextKey++;

/** The sheet `key` now reaches `px` up from the bottom of the screen, or (null) is gone. */
export function setFloor(key: number, px: number | null): void {
  if (px === null ? !floors.delete(key) : floors.get(key) === px) return;
  if (px !== null) floors.set(key, px);
  listeners.forEach((fn) => fn());
}

/** The highest open sheet's top, from the bottom of the screen (0 with none open). */
export const floor = (): number => Math.max(0, ...floors.values());

export function onFloor(fn: () => void): () => void {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}
