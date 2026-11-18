// Bredbord's pixel icons and logo, drawn as plain rectangles so they stay sharp at any
// screen density.
import { memo } from 'react';
import { PixelRatio, View } from 'react-native';
import { PX } from './generated/px';
import { APP_PX } from './icons';
import { C } from './theme';

const ICONS = { ...PX, ...APP_PX };
export type IconName = keyof typeof ICONS;

/** One art pixel in screen units: a whole number of real pixels, about `want` units. */
function unit(want: number): number {
  const ratio = PixelRatio.get();
  return Math.max(1, Math.round(want * ratio)) / ratio;
}

/** Each row's runs of the same character, as rectangles. */
function runs(rows: readonly string[]): { x: number; y: number; w: number; ch: string }[] {
  const out: { x: number; y: number; w: number; ch: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === '.') {
        x++;
        continue;
      }
      let w = 1;
      while (row[x + w] === ch) w++;
      out.push({ x, y, w, ch });
      x += w;
    }
  });
  return out;
}

export const Icon = memo(function Icon({
  name,
  color = C.ink2,
  size = 2,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  const u = unit(size);
  return (
    <View style={{ width: 9 * u, height: 9 * u }}>
      {runs(ICONS[name]).map((r, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: r.x * u,
            top: r.y * u,
            width: r.w * u,
            height: u,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
});

// "Rails, plain": BREDBORD in 5-pixel capitals between a red rail and a blue one (docs/DESIGN.md section 4).
const LOGO = [
  '###...###...###..###...###....##...###...###.',
  '#..#..#..#..#....#..#..#..#..#..#..#..#..#..#',
  '####..###...###..#..#..####..#..#..###...#..#',
  '#..#..#.#...#....#..#..#..#..#..#..#.#...#..#',
  '###...#..#..###..###...###....##...#..#..###.',
];

export const Logo = memo(function Logo({ size = 2 }: { size?: number }) {
  const u = unit(size);
  return (
    <View style={{ width: 45 * u, height: 11 * u }} accessibilityRole="image" accessibilityLabel="Bredbord">
      <View style={{ position: 'absolute', left: 0, top: 0, width: 45 * u, height: u, backgroundColor: C.railRed }} />
      {runs(LOGO).map((r, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: r.x * u,
            top: (r.y + 3) * u,
            width: r.w * u,
            height: u,
            backgroundColor: C.ink,
          }}
        />
      ))}
      <View
        style={{ position: 'absolute', left: 0, top: 10 * u, width: 45 * u, height: u, backgroundColor: C.railBlue }}
      />
    </View>
  );
});
