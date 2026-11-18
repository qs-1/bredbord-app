// Sheets and the long-press menu draw here, over the whole app, rather than in a Modal. A Modal is a
// window of its own on Android: it shows a frame late (so animations started with it jump), and the
// keyboard covers what's in it without telling the app how tall it is.
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';

let entries: { id: number; node: ReactNode }[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const changed = (): void => listeners.forEach((fn) => fn());

/** Goes once at the root of the app, after the screens. */
export function OverlayHost() {
  const [, redraw] = useState(0);
  useEffect(() => {
    const fn = (): void => redraw((n) => n + 1);
    listeners.add(fn);
    return () => void listeners.delete(fn);
  }, []);
  if (!entries.length) return null;
  return (
    <View style={s.host} pointerEvents="box-none">
      {entries.map((e) => (
        <Fragment key={e.id}>{e.node}</Fragment>
      ))}
    </View>
  );
}

/**
 * Draws `children` over everything while mounted; Android's back button calls `onBack`. The children
 * are drawn by the host, so components inside them read the app's root providers, not the screen's.
 */
export function Overlay({ children, onBack }: { children: ReactNode; onBack?: () => void }) {
  const id = useRef(0);
  if (!id.current) id.current = nextId++;
  useLayoutEffect(() => {
    const at = entries.findIndex((e) => e.id === id.current);
    if (at >= 0) entries = entries.map((e, i) => (i === at ? { id: e.id, node: children } : e));
    else entries = [...entries, { id: id.current, node: children }];
    changed();
  });
  useEffect(
    () => () => {
      entries = entries.filter((e) => e.id !== id.current);
      changed();
    },
    [],
  );
  const back = useRef(onBack);
  back.current = onBack;
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!back.current) return false;
      back.current();
      return true;
    });
    return () => sub.remove();
  }, []);
  return null;
}

const s = StyleSheet.create({
  host: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 100, elevation: 100 },
});
