// A circuit's page: its picture, name, maker, description, tags and parts, with Play. Three kinds:
// the user's own (Edit, Share, Duplicate, Delete), a built-in example (Remix), and one someone
// shared (Remix, Like, Copy link, Report). A remix shows what it was remixed from.
import { useCallback, useEffect, useState } from 'react';
import { note } from '../dialog';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { getAccount, useAccount } from '../account';
import {
  createCircuit,
  duplicateCircuit,
  freeName,
  getCircuit,
  localOf,
  onCircuitsChange,
  readPicture,
  savePicture,
  type CircuitInfo,
} from '../circuits';
import { getOriginal, getShared, keepMine, liked, setHidden, setLiked } from '../community';
import { askReport, confirmDelete, remixAndOpen } from '../menus';
import { EXAMPLES, exampleParts, readExampleDoc, readExamplePicture } from '../examples';
import { PartPicture } from '../PartPicture';
import { autoTags, isChip, partTitle, type PartCounts } from '../parts';
import { Icon, type IconName } from '../Px';
import { ShareSheet, VISIBILITY } from '../ShareSheet';
import { SignInSheet } from '../SignIn';
import { linkFor, pictureUrl, type RemoteCircuit } from '../supabase';
import { C, F } from '../theme';
import { Button, Chip, IconButton, Person } from '../ui';
import { ago } from './Home';

interface Shown {
  name: string;
  description: string;
  tags: string[];
  parts: PartCounts;
  picture: string | null;
  /** The user's own circuit. */
  info: CircuitInfo | null;
  /** One someone shared. */
  remote: RemoteCircuit | null;
}

/** What it was remixed from: a small card, or "Original removed". */
interface From {
  name: string;
  by: string;
  picture: string | null;
  open: (() => void) | null;
}

const toast = (text: string): void => note(text);

export function Circuit({ navigation, route }: NativeStackScreenProps<Screens, 'Circuit'>) {
  const { id, example, remote: remoteId, code } = route.params;
  const insets = useSafeAreaInsets();
  const account = useAccount();
  const [c, setC] = useState<Shown | null>(null);
  const [missing, setMissing] = useState(false);
  const [from, setFrom] = useState<From | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [more, setMore] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [signIn, setSignIn] = useState<{ title: string; then: () => void } | null>(null);

  const originalOf = useCallback(
    async (
      remix: { name: string; by: string; remote?: string } | null,
      wasRemix: boolean,
      remoteOf?: string | null,
    ) => {
      if (remix?.by === 'Bredbord') {
        const index = EXAMPLES.findIndex((e) => e.name === remix.name);
        if (index >= 0)
          return setFrom({
            name: remix.name,
            by: 'Bredbord',
            picture: await readExamplePicture(index),
            open: () => navigation.push('Circuit', { example: index }),
          });
      }
      const original = remix?.remote ?? remoteOf;
      const o = original ? await getOriginal(original).catch(() => null) : null;
      if (o)
        return setFrom({
          name: o.title,
          by: o.maker?.username ?? '',
          picture: pictureUrl(o.picture_path, o.updated_at),
          open: () => navigation.push('Circuit', { remote: o.id }),
        });
      setFrom(
        remix || wasRemix
          ? { name: remix?.name ?? 'Original removed', by: remix ? 'Original removed' : '', picture: null, open: null }
          : null,
      );
    },
    [navigation],
  );

  const load = useCallback(async () => {
    if (example !== undefined) {
      const e = EXAMPLES[example];
      const parts = await exampleParts(example);
      setC({
        name: e.name,
        description: e.description,
        tags: autoTags(parts),
        parts,
        picture: await readExamplePicture(example),
        info: null,
        remote: null,
      });
      return;
    }
    // One of the user's own, opened from Community, a profile or a link: the one on this phone, if it's here.
    const me = getAccount().session?.user.id;
    const here = !id && remoteId ? await localOf(remoteId) : null;
    const localId = id ?? (here && here.remote?.owner === me ? here.id : undefined);
    if (!localId && (remoteId || code)) {
      const r = await getShared(remoteId ? { id: remoteId } : { code }).catch(() => null);
      if (!r) return setMissing(true);
      const mineHere = r.owner === me ? await localOf(r.id) : null;
      if (mineHere) return navigation.replace('Circuit', { id: mineHere.id });
      setC({
        name: r.title,
        description: r.description,
        tags: r.tags,
        parts: r.parts,
        picture: pictureUrl(r.picture_path, r.updated_at),
        info: null,
        remote: r,
      });
      setLikes(r.like_count);
      setIsLiked(await liked(r.id));
      await originalOf(null, r.is_remix, r.remix_of);
      return;
    }
    const info = localId ? await getCircuit(localId) : null;
    if (!info) return navigation.goBack();
    setC({
      name: info.name,
      description: info.description,
      tags: info.tags ?? autoTags(info.parts),
      parts: info.parts,
      picture: await readPicture(info.id),
      info,
      remote: null,
    });
    await originalOf(info.remixOf, !!info.remixOf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, example, remoteId, code, navigation, originalOf, account.session?.user.id]);

  useEffect(() => {
    void load();
    return onCircuitsChange(() => void load());
  }, [load]);

  // Signed in or out: likes are per person.
  useEffect(() => {
    if (c?.remote) void liked(c.remote.id).then(setIsLiked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.session]);

  if (missing)
    return (
      <View style={[s.screen, { paddingTop: insets.top }]}>
        <View style={s.top}>
          <IconButton icon="chevl" label="Back" onPress={() => navigation.goBack()} />
        </View>
        <Text style={s.note}>This circuit isn’t there any more, or isn’t shared</Text>
      </View>
    );
  if (!c) return <View style={[s.screen, { paddingTop: insets.top }]} />;
  const own = c.info;
  const shared = c.remote;
  const mine = !!shared && shared.owner === account.session?.user.id;

  /** Runs `then` once signed in with a name, asking first if need be. */
  const withAccount = (title: string, then: () => void): void => {
    if (account.profile) then();
    else setSignIn({ title, then });
  };

  /** One of the user's own that isn't on this phone: kept here, then changed like any other. */
  const editMine = async (): Promise<void> => {
    if (!shared) return;
    try {
      const info = await keepMine(shared);
      navigation.replace('Circuit', { id: info.id });
      navigation.navigate('Edit', { id: info.id });
    } catch (e) {
      toast(e instanceof Error ? e.message : 'It couldn’t be opened');
    }
  };

  const play = (): void => {
    if (own) navigation.navigate('Workbench', { id: own.id, name: own.name });
    else if (shared) navigation.navigate('Workbench', { name: shared.title, remote: shared.id });
    else navigation.navigate('Workbench', { name: c.name, example });
  };

  const remix = async (): Promise<void> => {
    if (shared) return remixAndOpen(shared, navigation);
    if (example === undefined) return;
    const doc = await readExampleDoc(example);
    // Not made yet (the examples are drawn on first run): the desk makes it, and it's kept once it's open.
    if (!doc) return navigation.navigate('Workbench', { name: c.name, example, keep: true });
    const info = await createCircuit(await freeName(c.name), doc, {
      description: c.description,
      remixOf: { name: c.name, by: 'Bredbord' },
    });
    if (c.picture) await savePicture(info.id, c.picture);
    navigation.navigate('Workbench', { id: info.id, name: info.name });
  };

  const like = (): void =>
    withAccount('Sign in to like this', async () => {
      if (!shared) return;
      const on = !isLiked;
      setIsLiked(on);
      setLikes((n) => n + (on ? 1 : -1));
      try {
        await setLiked(shared.id, on);
      } catch {
        setIsLiked(!on);
        setLikes((n) => n + (on ? -1 : 1));
        toast('That didn’t work. Try again');
      }
    });

  const copyShared = async (): Promise<void> => {
    if (!shared) return;
    await Clipboard.setStringAsync(linkFor(shared.link_code));
    toast(shared.visibility === 'public' ? 'Public link copied' : 'Private link copied');
  };

  const reportIt = (): void => {
    if (shared) askReport(shared.id, (title, then) => setSignIn({ title, then }));
  };

  const parts = Object.entries(c.parts).sort(([a], [b]) => {
    const order = (x: string): number => (isChip(x) ? 0 : 1);
    return order(a) - order(b) || c.parts[b] - c.parts[a];
  });

  const menu: { label: string; icon: IconName; bad?: boolean; run: () => void }[] = own
    ? [
        {
          label: 'Duplicate',
          icon: 'duplicate',
          run: () =>
            void duplicateCircuit(own.id).then((copy) => copy && navigation.replace('Circuit', { id: copy.id })),
        },
        {
          label: 'Delete',
          icon: 'trash',
          bad: true,
          run: () => confirmDelete(own, () => navigation.goBack()),
        },
      ]
    : shared && !mine
      ? [
          { label: 'Report', icon: 'warn', bad: true, run: reportIt },
          ...(account.profile?.is_admin
            ? [
                {
                  label: 'Hide (admin)',
                  icon: 'close' as IconName,
                  run: () =>
                    void setHidden(shared.id, true)
                      .then(() => toast('Hidden'))
                      .catch(() => toast('That didn’t work')),
                },
              ]
            : []),
        ]
      : [];

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <View style={s.top}>
        <IconButton icon="chevl" label="Back" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }} />
        {own && <IconButton icon="pencil" label="Edit" onPress={() => navigation.navigate('Edit', { id: own.id })} />}
        {mine && <IconButton icon="pencil" label="Edit" onPress={() => void editMine()} />}
        {menu.length > 0 && <IconButton icon="more" label="More" onPress={() => setMore(true)} />}
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 32 }}>
        <View style={s.pic}>{c.picture && <Image source={{ uri: c.picture }} style={s.picImage} />}</View>
        <Text style={s.h2}>{c.name}</Text>

        {own ? (
          <View style={s.maker}>
            <Icon name={VISIBILITY[own.visibility].icon} color={C.ink2} />
            <View>
              <Text style={s.makerName}>{VISIBILITY[own.visibility].label}</Text>
              <Text style={s.makerSub}>Changed {ago(own.changed)}</Text>
            </View>
          </View>
        ) : shared ? (
          <Pressable
            style={s.maker}
            disabled={!shared.maker}
            onPress={() => shared.maker && navigation.push('Profile', { username: shared.maker.username })}
          >
            <Person part={shared.maker?.picture ?? 'NE555'} size={36} />
            <View>
              <Text style={s.makerName}>{shared.maker?.username ?? ''}</Text>
              <Text style={s.makerSub}>Shared {ago(new Date(shared.created_at).getTime())}</Text>
            </View>
          </Pressable>
        ) : (
          <View style={s.maker}>
            <Person part="NE555" size={36} />
            <Text style={s.makerName}>From Bredbord</Text>
          </View>
        )}

        <View style={s.actions}>
          <Button label="Play" icon="play" main onPress={play} />
          {own ? (
            <Button label="Share" icon="share" onPress={() => setSharing(true)} />
          ) : mine ? null : (
            <Button label="Remix" icon="remix" onPress={() => void remix()} />
          )}
          {shared && (
            <>
              <Button icon={isLiked ? 'heartf' : 'heart'} onPress={like} />
              <Button icon="link" onPress={() => void copyShared()} />
            </>
          )}
        </View>

        {!!c.description && <Text style={s.about}>{c.description}</Text>}
        {c.tags.length > 0 && (
          <View style={s.tags}>
            {c.tags.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </View>
        )}

        {parts.length > 0 && (
          <>
            <Text style={s.sec}>Parts</Text>
            <View style={s.parts}>
              {parts.map(([part, count]) => (
                <View key={part} style={s.part}>
                  <PartPicture id={part} width={64} />
                  <Text style={s.partName} numberOfLines={1}>
                    {partTitle(part)}
                  </Text>
                  <Text style={s.partCount}>{count}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {shared && (
          <Text style={s.sec}>
            {likes === 1 ? 'Liked by 1 person' : `Liked by ${likes} people`}
            {shared.remix_count > 0
              ? `, remixed ${shared.remix_count === 1 ? 'once' : `${shared.remix_count} times`}`
              : ''}
          </Text>
        )}

        {from && (
          <>
            <Text style={s.sec}>Remixed from</Text>
            <Pressable
              style={s.mini}
              disabled={!from.open}
              onPress={() => from.open?.()}
              android_ripple={{ color: C.press }}
            >
              <View style={s.miniPic}>
                {from.picture && <Image source={{ uri: from.picture }} style={s.picImage} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.miniName} numberOfLines={1}>
                  {from.name}
                </Text>
                {!!from.by && <Text style={s.makerSub}>{from.by}</Text>}
              </View>
            </Pressable>
          </>
        )}
      </ScrollView>

      <Modal visible={more} transparent statusBarTranslucent animationType="fade" onRequestClose={() => setMore(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setMore(false)} />
        <View style={[s.menu, { top: insets.top + 48 }]}>
          {menu.map((m, i) => (
            <Pressable
              key={m.label}
              style={[s.menuRow, i > 0 && s.menuLine]}
              android_ripple={{ color: C.press }}
              onPress={() => {
                setMore(false);
                m.run();
              }}
            >
              <Text style={[s.menuText, m.bad && { color: C.bad }]}>{m.label}</Text>
              <Icon name={m.icon} color={m.bad ? C.bad : C.ink2} />
            </Pressable>
          ))}
        </View>
      </Modal>
      <ShareSheet id={own?.id ?? null} open={sharing} onClose={() => setSharing(false)} />
      <SignInSheet
        open={!!signIn}
        title={signIn?.title ?? ''}
        onClose={() => setSignIn(null)}
        onDone={() => signIn?.then()}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  top: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  note: { fontFamily: F.regular, fontSize: 15, color: C.ink3, padding: 24, textAlign: 'center' },
  pic: {
    aspectRatio: 4 / 3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: C.desk,
    borderWidth: 1,
    borderColor: C.line,
  },
  picImage: { width: '100%', height: '100%' },
  h2: { fontFamily: F.medium, fontSize: 24, lineHeight: 29, color: C.ink, marginTop: 16 },
  maker: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  makerName: { fontFamily: F.regular, fontSize: 15, color: C.ink2 },
  makerSub: { fontFamily: F.regular, fontSize: 13, color: C.ink3 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 16 },
  about: { fontFamily: F.regular, fontSize: 15, lineHeight: 21, color: C.ink2, marginTop: 16 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  sec: { fontFamily: F.medium, fontSize: 13, color: C.ink3, marginTop: 24, marginBottom: 8 },
  parts: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  part: {
    width: '31.6%',
    backgroundColor: C.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.line,
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: 'center',
    gap: 4,
  },
  partName: { fontFamily: F.mono, fontSize: 12, color: C.ink2 },
  partCount: { fontFamily: F.regular, fontSize: 12, color: C.ink3 },
  mini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 6,
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
  },
  miniPic: { width: 96, aspectRatio: 4 / 3, borderRadius: 8, overflow: 'hidden', backgroundColor: C.desk },
  miniName: { fontFamily: F.medium, fontSize: 15, color: C.ink },
  menu: {
    position: 'absolute',
    right: 12,
    width: 200,
    backgroundColor: C.card,
    borderRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  menuRow: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLine: { borderTopWidth: 1, borderTopColor: C.line },
  menuText: { fontFamily: F.regular, fontSize: 15, color: C.ink },
});
