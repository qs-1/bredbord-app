// What a card's long-press menu offers, wherever the card is: one of the user's own (Play, Copy link,
// Duplicate, Delete) or one someone shared (Play, Remix, Copy link, Report).

import * as Clipboard from 'expo-clipboard';
import { alert, note } from './dialog';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Screens } from '../App';
import { getAccount } from './account';
import { duplicateCircuit, localOf, type CircuitInfo } from './circuits';
import { remixShared, removeCircuit, report } from './community';
import { linkFor, type RemoteCircuit } from './supabase';
import type { MenuItem } from './ui';

/** Any screen's navigation: only going to another screen is needed. */
type Nav = Pick<NativeStackNavigationProp<Screens>, 'navigate'>;
/** Asks the person to sign in, then runs `then`. */
export type AskSignIn = (title: string, then: () => void) => void;

const toast = (text: string): void => note(text);

export function confirmDelete(info: CircuitInfo, done?: () => void): void {
  alert(
    `Delete ${info.name}?`,
    info.remote ? 'It’s taken offline too. This can’t be undone.' : 'This can’t be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          void removeCircuit(info.id)
            .then(() => done?.())
            .catch(() => toast('It couldn’t be taken offline. Try again when you’re online')),
      },
    ],
  );
}

/** Opens the Share sheet for one of the user's circuits. */
export type OpenShare = (info: CircuitInfo) => void;

export function mineMenu(info: CircuitInfo, nav: Nav, share: OpenShare): MenuItem[] {
  return [
    { label: 'Play', icon: 'play', onPress: () => nav.navigate('Workbench', { id: info.id, name: info.name }) },
    { label: 'Share', icon: 'share', onPress: () => share(info) },
    { label: 'Duplicate', icon: 'duplicate', onPress: () => void duplicateCircuit(info.id) },
    { label: 'Delete', icon: 'trash', bad: true, onPress: () => confirmDelete(info) },
  ];
}

/** Signs in first if need be, then asks why. */
export function askReport(circuitId: string, signIn: AskSignIn): void {
  const ask = (): void => {
    const send = (reason: string) => () =>
      void report({ circuit: circuitId }, reason)
        .then(() => toast('Reported. Thank you'))
        .catch(() => toast('That didn’t work. Try again'));
    alert('Report this circuit?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'It’s spam', onPress: send('spam') },
      { text: 'It’s offensive', onPress: send('offensive') },
    ]);
  };
  if (getAccount().profile) ask();
  else signIn('Sign in to report this', ask);
}

export async function remixAndOpen(r: RemoteCircuit, nav: Nav): Promise<void> {
  try {
    const info = await remixShared(r);
    nav.navigate('Workbench', { id: info.id, name: info.name });
  } catch (e) {
    toast(e instanceof Error ? e.message : 'It couldn’t be opened');
  }
}

/** A shared circuit's card: the user's own gets their own menu (when it's on this phone). */
export async function sharedMenu(r: RemoteCircuit, nav: Nav, signIn: AskSignIn, share: OpenShare): Promise<MenuItem[]> {
  const mine = r.owner === getAccount().session?.user.id;
  const here = mine ? await localOf(r.id) : null;
  if (here) return mineMenu(here, nav, share);
  const copy: MenuItem = {
    label: 'Copy link',
    icon: 'link',
    onPress: () =>
      void Clipboard.setStringAsync(linkFor(r.link_code)).then(() =>
        toast(r.visibility === 'public' ? 'Public link copied' : 'Private link copied'),
      ),
  };
  const play: MenuItem = {
    label: 'Play',
    icon: 'play',
    onPress: () => nav.navigate('Workbench', { name: r.title, remote: r.id }),
  };
  if (mine) return [play, copy];
  return [
    play,
    { label: 'Remix', icon: 'remix', onPress: () => void remixAndOpen(r, nav) },
    copy,
    { label: 'Report', icon: 'warn', bad: true, onPress: () => askReport(r.id, signIn) },
  ];
}
