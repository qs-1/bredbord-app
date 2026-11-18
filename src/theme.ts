// Bredbord's colours, type and shape (docs/DESIGN.md section 5), for native screens.
export const C = {
  ink: '#1f1d1a',
  ink2: '#57524a',
  ink3: '#7b756b',
  line: 'rgba(31,29,26,0.10)',
  line2: 'rgba(31,29,26,0.20)',
  bar: '#fbfaf7',
  card: '#ffffff',
  raised: '#f0eee9',
  press: '#e6e3dc',
  desk: '#e9e7e1',
  railRed: '#e2362a',
  railBlue: '#2a62d8',
  /** Delete and nothing else, as Apple marks things that can't be undone. */
  bad: '#c8352b',
} as const;

export const WIRE = {
  red: '#e2362a',
  black: '#262422',
  blue: '#2a62d8',
  yellow: '#f0c419',
  green: '#2fa84f',
  orange: '#f07a1a',
  white: '#f2f1ee',
  purple: '#8a4fd8',
} as const;
export type WireColor = keyof typeof WIRE;

export const F = {
  regular: 'AtkinsonHyperlegibleNext_400Regular',
  medium: 'AtkinsonHyperlegibleNext_500Medium',
  mono: 'AtkinsonHyperlegibleMono_400Regular',
} as const;

export const R = { control: 6, card: 10, sheet: 14 } as const;
