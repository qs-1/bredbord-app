// What a circuit is made of, read from its document: counts by part, the chips in it, and the tags
// worked out from them, using the copy of the desk's parts list in generated/parts.ts.
import { PARTS } from './generated/parts';

/** How many of each part, by its id ('NE555', 'led-red', 'resistor'). */
export type PartCounts = Record<string, number>;

export function partsOf(doc: unknown): PartCounts {
  const out: PartCounts = {};
  const parts = (doc as { parts?: { def?: unknown }[] } | null)?.parts;
  if (!Array.isArray(parts)) return out;
  for (const p of parts) if (typeof p?.def === 'string') out[p.def] = (out[p.def] ?? 0) + 1;
  return out;
}

/** A chip (a DIP part), by the desk's own list. */
export const isChip = (id: string): boolean => PARTS[id]?.kind === 'dip';

/** The chips in it, most used first, for the small line on a card. */
export function chipsOf(parts: PartCounts): string[] {
  const chips = Object.keys(parts).filter((id) => isChip(id) || id === 'nano');
  return chips.sort((a, b) => parts[b] - parts[a]).map((id) => (id === 'nano' ? 'Nano' : id));
}

const RULES: [RegExp, string][] = [
  [/555/, 'Timers'],
  [/^74/, 'Logic'],
  [/^CD40/, 'Logic'],
  [/^(W65C|65C|6502|6522)/, 'CPU'],
  [/^(AT28|28C|62256)/, 'Memory'],
  [/^nano$/, 'Arduino'],
  [/^(lcd|7seg)/, 'Displays'],
  [/^(buzzer|speaker)/, 'Sound'],
];

/** Tags worked out from the parts, used until the user sets their own. */
export function autoTags(parts: PartCounts): string[] {
  const tags = new Set<string>();
  for (const id of Object.keys(parts)) for (const [test, tag] of RULES) if (test.test(id)) tags.add(tag);
  return [...tags];
}

const TITLES: Record<string, string> = {
  'cap-ceramic': 'Capacitor',
  'cap-electrolytic': 'Capacitor',
  'resistor-network': 'Resistors',
  'dip-switch-4': 'DIP switch',
  'dip-switch-8': 'DIP switch',
  nano: 'Nano',
  'lcd-1602': 'LCD',
};

/** A short name for the parts list: chips by number, the rest in words, as the desk names them. */
export function partTitle(id: string): string {
  const def = PARTS[id];
  if (!def) return id;
  if (def.kind === 'dip') return id;
  if (def.kind === 'led') return 'LED';
  if (def.kind === 'display') return '7-segment';
  return TITLES[id] ?? def.title;
}
