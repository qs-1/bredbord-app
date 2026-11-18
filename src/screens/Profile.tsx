// A person's page: their picture, name, when they joined, and the circuits they've made public. The
// user's own page is where the top-right button on Home leads, with Settings at its top right.
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { useAccount } from '../account';
import { feed, onLeftCommunity, profileByName } from '../community';
import { sharedMenu } from '../menus';
import { ShareSheet } from '../ShareSheet';
import { SignInSheet } from '../SignIn';
import type { Profile as Person, RemoteCircuit } from '../supabase';
import { C, F } from '../theme';
import { IconButton, LiftMenu, Person as Picture, useColumns, type CardProps, type MenuItem } from '../ui';
import { SharedCard } from './Home';

type CardAt = { x: number; y: number; width: number; height: number };

const joined = (iso: string): string =>
  `Joined ${new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;

// What each person's page showed last, so opening it again shows that straight away (not 0, then the
// real counts) while the newest copy loads.
const seen = new Map<string, { who: Person; circuits: RemoteCircuit[] }>();

export function Profile({ navigation, route }: NativeStackScreenProps<Screens, 'Profile'>) {
  const insets = useSafeAreaInsets();
  const { columns, cardWidth } = useColumns();
  const last = seen.get(route.params.username);
  const [who, setWho] = useState<Person | null | undefined>(last?.who);
  // null until loaded: the counts stay blank instead of showing 0.
  const [circuits, setCircuits] = useState<RemoteCircuit[] | null>(last?.circuits ?? null);
  const account = useAccount();
  const mine = !!account.profile && account.profile.username === route.params.username;
  const [menu, setMenu] = useState<{ items: MenuItem[]; card: CardProps; at: CardAt } | null>(null);
  const [signIn, setSignIn] = useState<{ title: string; then: () => void } | null>(null);
  const askSignIn = useCallback((title: string, then: () => void) => setSignIn({ title, then }), []);
  const [sharing, setSharing] = useState<string | null>(null);
  const openShare = useCallback((info: { id: string }) => setSharing(info.id), []);
  const openMenu = useCallback(
    (item: RemoteCircuit, card: CardProps, at: CardAt) =>
      void sharedMenu(item, navigation, askSignIn, openShare).then((items) => setMenu({ items, card, at })),
    [navigation, askSignIn, openShare],
  );

  useEffect(() => {
    void profileByName(route.params.username).then(async (p) => {
      setWho(p);
      if (!p) return seen.delete(route.params.username);
      const list = await feed({ sort: 'popular', owner: p.id }).catch(() => null);
      const now = list ?? seen.get(route.params.username)?.circuits ?? [];
      seen.set(route.params.username, { who: p, circuits: now });
      setCircuits(now);
    });
  }, [route.params.username]);
  useEffect(() => onLeftCommunity((gone) => setCircuits((now) => now && now.filter((r) => r.id !== gone))), []);

  const likes = circuits?.reduce((n, c) => n + c.like_count, 0);
  const remixes = circuits?.reduce((n, c) => n + c.remix_count, 0);

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <View style={s.top}>
        <IconButton icon="chevl" label="Back" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }} />
        {mine && <IconButton icon="gear" label="Settings" onPress={() => navigation.navigate('You')} />}
      </View>
      {who === null ? (
        <Text style={s.note}>Nobody by that name</Text>
      ) : (
        <FlatList
          key={`profile-${columns}`}
          data={circuits ?? []}
          keyExtractor={(c) => c.id}
          numColumns={columns}
          columnWrapperStyle={s.gridRow}
          scrollEnabled={!menu}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          ListHeaderComponent={
            who ? (
              <View style={s.who}>
                <Picture part={who.picture} size={72} />
                <Text style={s.name}>{who.username}</Text>
                <Text style={s.sub}>{joined(who.created_at)}</Text>
                <View style={s.counts}>
                  <Count n={circuits?.length} label="circuits" />
                  <Count n={likes} label="likes" />
                  <Count n={remixes} label="remixes" />
                </View>
              </View>
            ) : undefined
          }
          renderItem={({ item }) => (
            <SharedCard
              item={item}
              width={cardWidth}
              noMaker
              open={(to) => navigation.push('Circuit', to)}
              onMenu={openMenu}
            />
          )}
        />
      )}
      <LiftMenu
        at={menu?.at ?? null}
        card={menu?.card ?? null}
        items={menu?.items ?? []}
        onClose={() => setMenu(null)}
      />
      <ShareSheet id={sharing} open={!!sharing} onClose={() => setSharing(null)} />
      <SignInSheet
        open={!!signIn}
        title={signIn?.title ?? ''}
        onClose={() => setSignIn(null)}
        onDone={() => signIn?.then()}
      />
    </View>
  );
}

function Count({ n, label }: { n: number | undefined; label: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={s.countN}>{n ?? ' '}</Text>
      <Text style={s.sub}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  top: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  who: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  name: { fontFamily: F.medium, fontSize: 22, color: C.ink, marginTop: 12 },
  sub: { fontFamily: F.regular, fontSize: 13, color: C.ink3, marginTop: 2 },
  counts: { flexDirection: 'row', gap: 32, marginTop: 16 },
  countN: { fontFamily: F.medium, fontSize: 17, color: C.ink },
  gridRow: { gap: 12, paddingHorizontal: 16, marginBottom: 12 },
  note: { fontFamily: F.regular, fontSize: 15, color: C.ink3, padding: 24, textAlign: 'center' },
});
