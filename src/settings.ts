// The app's settings (the You screen), kept on the phone. Read once, then held here; every screen
// that uses them hears when one changes.
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Settings {
  graphics: 'high' | 'low';
  vibrate: boolean;
  keepAwake: boolean;
  magnifier: boolean;
  hidePinNames: boolean;
}

const DEFAULTS: Settings = { graphics: 'high', vibrate: true, keepAwake: true, magnifier: true, hidePinNames: false };
const KEY = 'settings';

let current: Settings = DEFAULTS;
const listeners = new Set<(s: Settings) => void>();

const loaded = AsyncStorage.getItem(KEY)
  .then((raw) => {
    if (raw) current = { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  })
  .catch(() => undefined)
  .then(() => listeners.forEach((fn) => fn(current)));

export function getSettings(): Settings {
  return current;
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]): void {
  current = { ...current, [key]: value };
  listeners.forEach((fn) => fn(current));
  void loaded.then(() => AsyncStorage.setItem(KEY, JSON.stringify(current)));
}

export function useSettings(): Settings {
  const [s, set] = useState(current);
  useEffect(() => {
    listeners.add(set);
    set(current);
    return () => void listeners.delete(set);
  }, []);
  return s;
}
