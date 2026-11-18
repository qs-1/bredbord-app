// A part's picture, the same drawing as its tile on the website's parts panel (src/ui/pictures.ts in
// the main project, copied into generated/parts.ts).
import { memo } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { PARTS, TILES } from './generated/parts';

/** `id` is a part ('NE555', 'led-red') or a board or instrument tile ('bb', 'meter'). */
export const PartPicture = memo(function PartPicture({ id, width = 64 }: { id: string; width?: number }) {
  const xml = PARTS[id]?.svg ?? TILES[id];
  const height = (width * 48) / 64;
  if (!xml) return <View style={{ width, height }} />;
  return <SvgXml xml={xml} width={width} height={height} />;
});
