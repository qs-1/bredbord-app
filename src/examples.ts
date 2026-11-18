// The desk's built-in examples ("From Bredbord"), in its order (src/app/example.ts in the main project).
// Their documents and pictures are made by the desk itself the first time the app runs (ExampleMaker)
// and kept here, so their cards have pictures and their pages list their parts.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { partsOf, type PartCounts } from './parts';

export const EXAMPLES: { name: string; description: string }[] = [
  { name: 'NAND gate', description: 'Two buttons, one gate, one LED. The place to start' },
  { name: '555 clock', description: 'A blinking LED from the classic timer chip' },
  { name: '4-bit counter', description: 'Counts to fifteen in binary, then starts again' },
  { name: '4-bit register', description: 'Holds a number until it is told to change' },
  { name: '8-bit computer clock', description: 'Free running, or one step at a time' },
];

/** Bump when the desk's examples change, so they're made again. */
const VERSION = 1;
const docKey = (i: number): string => `examples/${VERSION}/doc/${i}`;
const pictureKey = (i: number): string => `examples/${VERSION}/picture/${i}`;

const listeners = new Set<() => void>();
export function onExamplesChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}

export async function saveExample(i: number, doc: unknown, jpeg: string): Promise<void> {
  await AsyncStorage.multiSet([
    [docKey(i), JSON.stringify(doc)],
    [pictureKey(i), jpeg],
  ]);
  listeners.forEach((fn) => fn());
}

export async function readExampleDoc(i: number): Promise<unknown | null> {
  try {
    return JSON.parse((await AsyncStorage.getItem(docKey(i))) ?? 'null');
  } catch {
    return null;
  }
}

export const readExamplePicture = (i: number): Promise<string | null> => AsyncStorage.getItem(pictureKey(i));

export async function exampleParts(i: number): Promise<PartCounts> {
  return partsOf(await readExampleDoc(i));
}

/** The examples not made yet. */
export async function missingExamples(): Promise<number[]> {
  const got = await AsyncStorage.multiGet(EXAMPLES.map((_, i) => pictureKey(i)));
  return got.flatMap(([, v], i) => (v ? [] : [i]));
}
