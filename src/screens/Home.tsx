// Home: two pages side by side, swiped between or picked by their tabs. Community (what the app opens
// on) and the circuits kept on this phone. The You button (settings, account, about) sits at the top.
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentRef, type RefObject } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { LegacyScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { useAccount } from '../account';
import { freeName, listCircuits, onCircuitsChange, readPicture, type CircuitInfo } from '../circuits';
import { feed, onLeftCommunity, type FeedSort } from '../community';
import { syncNow } from '../sync';
import { EXAMPLES, exampleParts, onExamplesChange, readExamplePicture } from '../examples';
import { ExampleMaker } from '../ExampleMaker';
import { autoTags, chipsOf, type PartCounts } from '../parts';
import { Icon, Logo } from '../Px';
import { mineMenu, sharedMenu } from '../menus';
import { pictureUrl, supabase, type RemoteCircuit } from '../supabase';
import { C, F } from '../theme';
import {
  BottomSheet,
  Card,
  Chip,
  FilterRow,
  LiftMenu,
  Person,
  Row,
  SheetHead,
  useColumns,
  type CardProps,
  type MenuItem,
} from '../ui';

type At = { x: number; y: number; width: number; height: number };

/** The home pages swipe with the gesture library's scroll view, so they can wait for the rows inside. */
const Pager = Animated.createAnimatedComponent(LegacyScrollView);
import { ShareSheet } from '../ShareSheet';
import { SignInSheet } from '../SignIn';

const TABS = ['Community', 'My circuits'] as const;

type Sort = 'changed' | 'name' | 'created';
const SORTS: { key: Sort; label: string; icon: 'clock' | 'az' | 'calendar' }[] = [
  { key: 'changed', label: 'Last changed', icon: 'clock' },
  { key: 'name', label: 'Name', icon: 'az' },
  { key: 'created', label: 'Newest first', icon: 'calendar' },
];

export function ago(time: number): string {
  const minutes = Math.round((Date.now() - time) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  return `${Math.round(days / 7)} weeks ago`;
}

export const tagsOf = (c: CircuitInfo): string[] => c.tags ?? autoTags(c.parts);

/** A picture read from storage, again whenever `stamp` changes. */
function usePicture(read: () => Promise<string | null>, stamp: unknown): string | null {
  const [uri, setUri] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    void read().then((p) => live && setUri(p));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stamp]);
  return uri;
}

function MyCard({
  info,
  width,
  onOpen,
  onMenu,
}: {
  info: CircuitInfo;
  width: number;
  onOpen: (info: CircuitInfo) => void;
  onMenu: (info: CircuitInfo, card: CardProps, at: At) => void;
}) {
  const picture = usePicture(() => readPicture(info.id), `${info.id}:${info.picture}`);
  const card: CardProps = {
    picture,
    chips: chipsOf(info.parts),
    title: info.name,
    remix: !!info.remixOf,
    foot: ago(info.changed),
    width,
    onPress: () => onOpen(info),
  };
  return <Card {...card} onLongPress={(at) => onMenu(info, card, at)} />;
}

function ExampleCard({
  index,
  width,
  stamp,
  onOpen,
}: {
  index: number;
  width: number;
  stamp: number;
  onOpen: () => void;
}) {
  const picture = usePicture(() => readExamplePicture(index), stamp);
  const [parts, setParts] = useState<PartCounts>({});
  useEffect(() => void exampleParts(index).then(setParts), [index, stamp]);
  const e = EXAMPLES[index];
  return (
    <Card
      picture={picture}
      chips={chipsOf(parts)}
      title={e.name}
      description={e.description}
      width={width}
      onPress={onOpen}
    />
  );
}

// ---------- Community ----------

const QUICK_TAGS = ['Logic', 'Timers', 'CPU', 'Memory', 'Arduino', 'Displays'];
const ALL_TAGS = [...QUICK_TAGS, 'Sound', 'Beginner', 'Games', 'Music', 'Sensors'];
const FEED_SORTS: { key: FeedSort; label: string; icon: 'flame' | 'clock' | 'remix' }[] = [
  { key: 'popular', label: 'Popular', icon: 'flame' },
  { key: 'new', label: 'Newest', icon: 'clock' },
  { key: 'remixed', label: 'Most remixed', icon: 'remix' },
];

/** A shared circuit's card, with who made it. */
export function SharedCard({
  item,
  width,
  open,
  onMenu,
  noMaker,
}: {
  item: RemoteCircuit;
  width: number;
  open: (to: { remote: string }) => void;
  onMenu: (item: RemoteCircuit, card: CardProps, at: At) => void;
  noMaker?: boolean;
}) {
  const card: CardProps = {
    picture: pictureUrl(item.picture_path, item.updated_at),
    chips: chipsOf(item.parts),
    title: item.title,
    remix: item.is_remix,
    description: item.description,
    foot:
      item.maker && !noMaker ? (
        <View style={s.by}>
          <Person part={item.maker.picture} size={20} />
          <Text style={s.byText} numberOfLines={1}>
            {item.maker.username}
          </Text>
        </View>
      ) : undefined,
    width,
    onPress: () => open({ remote: item.id }),
  };
  return <Card {...card} onLongPress={(at) => onMenu(item, card, at)} />;
}

/** From Bredbord, then what people have shared, with Filter (sort, search, tags) and tag choices. */
function CommunityPage({
  columns,
  cardWidth,
  bottom,
  examplesStamp,
  open,
  onMenu,
  locked,
  chipsRef,
  rowRef,
}: {
  columns: number;
  cardWidth: number;
  bottom: number;
  examplesStamp: number;
  open: (to: { example?: number; remote?: string }) => void;
  onMenu: (item: RemoteCircuit, card: CardProps, at: At) => void;
  /** The long-press menu is up: nothing scrolls under it. */
  locked: boolean;
  chipsRef: RefObject<ComponentRef<typeof ScrollView> | null>;
  rowRef: RefObject<ComponentRef<typeof ScrollView> | null>;
}) {
  const [quick, setQuick] = useState(0);
  const [sort, setSort] = useState<FeedSort>('popular');
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [items, setItems] = useState<RemoteCircuit[]>([]);
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  const picked = useMemo(() => [...new Set([...(quick > 0 ? [QUICK_TAGS[quick - 1]] : []), ...tags])], [quick, tags]);

  const load = useCallback(
    async (next: number) => {
      if (!supabase) return;
      setLoading(true);
      try {
        const got = await feed({ sort, tags: picked, search, page: next });
        setItems((now) => (next === 0 ? got : [...now, ...got]));
        setMore(got.length > 0);
        setPage(next);
        setOffline(false);
      } catch {
        setOffline(true);
      } finally {
        setLoading(false);
      }
    },
    [sort, picked, search],
  );
  useEffect(() => void load(0), [load]);
  useEffect(() => onLeftCommunity((gone) => setItems((now) => now.filter((r) => r.id !== gone))), []);

  const examples = (
    <>
      <Text style={s.section}>From Bredbord</Text>
      <LegacyScrollView
        ref={rowRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={s.hrow}
      >
        {EXAMPLES.map((_, i) => (
          <ExampleCard key={i} index={i} width={172} stamp={examplesStamp} onOpen={() => open({ example: i })} />
        ))}
      </LegacyScrollView>
    </>
  );

  // Without the community (not set up in this build), the examples are the page.
  if (!supabase)
    return (
      <FlatList
        key={`community-${columns}`}
        data={EXAMPLES.map((_, i) => i)}
        keyExtractor={(i) => String(i)}
        numColumns={columns}
        columnWrapperStyle={s.gridRow}
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        ListHeaderComponent={<Text style={s.section}>From Bredbord</Text>}
        renderItem={({ item }) => (
          <ExampleCard index={item} width={cardWidth} stamp={examplesStamp} onOpen={() => open({ example: item })} />
        )}
      />
    );

  const count =
    (sort === 'popular' ? 0 : 1) + (search.trim() ? 1 : 0) + tags.filter((t) => !QUICK_TAGS.includes(t)).length;
  const heading = FEED_SORTS.find((o) => o.key === sort)?.label ?? '';

  return (
    <>
      <FilterRow
        choices={['All', ...QUICK_TAGS]}
        on={quick}
        onPick={setQuick}
        count={count}
        onFilter={() => setFilterOpen(true)}
        scrollRef={chipsRef}
      />
      <FlatList
        key={`feed-${columns}`}
        scrollEnabled={!locked}
        data={items}
        keyExtractor={(c) => c.id}
        numColumns={columns}
        columnWrapperStyle={s.gridRow}
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        refreshing={loading && page === 0 && items.length > 0}
        onRefresh={() => void load(0)}
        onEndReachedThreshold={0.6}
        onEndReached={() => more && !loading && items.length > 0 && void load(page + 1)}
        ListHeaderComponent={
          <>
            {!picked.length && !search.trim() && examples}
            <Text style={s.section}>{heading}</Text>
          </>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={C.ink3} style={{ marginTop: 24 }} />
          ) : (
            <Text style={s.note}>{offline ? 'Community can’t be reached right now' : 'Nothing shared here yet'}</Text>
          )
        }
        renderItem={({ item }) => <SharedCard item={item} width={cardWidth} open={open} onMenu={onMenu} />}
      />

      <BottomSheet open={filterOpen} onClose={() => setFilterOpen(false)}>
        <SheetHead
          left="Reset"
          onLeft={() => {
            setSort('popular');
            setTags([]);
            setSearch('');
            setQuick(0);
          }}
          title="Filter"
          right="Done"
          onRight={() => setFilterOpen(false)}
        />
        <ScrollView style={{ flexGrow: 0 }} keyboardShouldPersistTaps="handled">
          <TextInput
            style={s.search}
            value={search}
            onChangeText={setSearch}
            placeholder="Search titles"
            placeholderTextColor={C.ink3}
            returnKeyType="search"
          />
          <Text style={s.sheetLabel}>Sort by</Text>
          <View style={s.rowsBox}>
            {FEED_SORTS.map((o, i) => (
              <Row
                key={o.key}
                first={i === 0}
                label={o.label}
                left={<Icon name={o.icon} color={C.ink2} />}
                right={sort === o.key ? <Icon name="check" color={C.ink} /> : undefined}
                onPress={() => setSort(o.key)}
              />
            ))}
          </View>
          <Text style={s.sheetLabel}>Tags</Text>
          <View style={s.tagWrap}>
            {ALL_TAGS.map((t) => (
              <Chip
                key={t}
                label={t}
                on={tags.includes(t)}
                onPress={() => setTags((now) => (now.includes(t) ? now.filter((x) => x !== t) : [...now, t]))}
              />
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
    </>
  );
}

export function Home({ navigation }: NativeStackScreenProps<Screens, 'Home'>) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { columns, cardWidth } = useColumns();
  const pager = useRef<ComponentRef<typeof ScrollView>>(null);
  // The rows that scroll sideways inside the pages: a swipe on them scrolls them, not the pages.
  const communityChips = useRef<ComponentRef<typeof ScrollView>>(null);
  const examplesRow = useRef<ComponentRef<typeof ScrollView>>(null);
  const myChips = useRef<ComponentRef<typeof ScrollView>>(null);
  // How far the pages have been swiped; the line under the tabs rides on it.
  const x = useRef(new Animated.Value(0)).current;
  const [tab, setTab] = useState(0);
  const [circuits, setCircuits] = useState<CircuitInfo[]>([]);
  const [examplesStamp, setExamplesStamp] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [sharing, setSharing] = useState<string | null>(null);
  const openShare = useCallback((info: CircuitInfo) => setSharing(info.id), []);

  // My circuits' filters
  const [quick, setQuick] = useState(0);
  const [sort, setSort] = useState<Sort>('changed');
  const [tags, setTags] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const [menu, setMenu] = useState<{ items: MenuItem[]; card: CardProps; at: At } | null>(null);
  const [signIn, setSignIn] = useState<{ title: string; then: () => void } | null>(null);
  const askSignIn = useCallback((title: string, then: () => void) => setSignIn({ title, then }), []);
  const account = useAccount();
  // Signed in (or with something online), circuits can be filtered by who can open them.
  const online = !!account.profile || circuits.some((c) => c.visibility !== 'me');
  const QUICK = online ? ['All', 'Public', 'Private link', 'Only me', 'Remixes'] : ['All', 'Remixes'];

  const refresh = useCallback(() => void listCircuits().then(setCircuits), []);
  useEffect(() => {
    refresh();
    return onCircuitsChange(refresh);
  }, [refresh]);
  useEffect(() => onExamplesChange(() => setExamplesStamp((n) => n + 1)), []);

  // Keep the pager on the right page when the screen turns.
  useEffect(() => {
    pager.current?.scrollTo({ x: tab * width, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // Kept once something is put on it, so backing out leaves nothing behind.
  const add = async (): Promise<void> =>
    navigation.navigate('Workbench', { name: await freeName('Untitled circuit'), fresh: true });

  const allTags = useMemo(() => [...new Set(circuits.flatMap(tagsOf))].sort(), [circuits]);
  const shown = useMemo(() => {
    let list = circuits;
    const pick = QUICK[quick] ?? 'All';
    if (pick === 'Remixes') list = list.filter((c) => c.remixOf);
    if (pick === 'Public') list = list.filter((c) => c.visibility === 'public');
    if (pick === 'Private link') list = list.filter((c) => c.visibility === 'link');
    if (pick === 'Only me') list = list.filter((c) => c.visibility === 'me');
    if (tags.length) list = list.filter((c) => tagsOf(c).some((t) => tags.includes(t)));
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'created') list = [...list].sort((a, b) => b.created - a.created);
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuits, quick, tags, sort, online]);
  const filterCount = (sort === 'changed' ? 0 : 1) + tags.length;

  const tabWidth = width / TABS.length;
  const openMine = useCallback((info: CircuitInfo) => navigation.navigate('Circuit', { id: info.id }), [navigation]);
  const openMenu = useCallback(
    (info: CircuitInfo, card: CardProps, at: At) => setMenu({ items: mineMenu(info, navigation, openShare), card, at }),
    [navigation, openShare],
  );
  const openSharedMenu = useCallback(
    (item: RemoteCircuit, card: CardProps, at: At) =>
      void sharedMenu(item, navigation, askSignIn, openShare).then((items) => setMenu({ items, card, at })),
    [navigation, askSignIn, openShare],
  );

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <View style={s.head}>
        <Logo />
        <Pressable
          style={s.you}
          onPress={() =>
            account.profile
              ? navigation.navigate('Profile', { username: account.profile.username })
              : navigation.navigate('You')
          }
          accessibilityLabel={account.profile ? 'Your page' : 'Settings'}
          android_ripple={{ color: C.press, borderless: true, radius: 22 }}
        >
          {account.profile ? (
            <Person part={account.profile.picture} size={32} />
          ) : (
            <View style={s.youCircle}>
              <Icon name="person" color={C.ink2} size={1.8} />
            </View>
          )}
        </Pressable>
      </View>
      <View style={s.tabs}>
        {TABS.map((t, i) => (
          <Pressable
            key={t}
            onPress={() => pager.current?.scrollTo({ x: i * width, animated: true })}
            style={s.tab}
            android_ripple={{ color: C.press }}
          >
            <Text style={[s.tabText, tab === i && s.tabOn]}>{t}</Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            s.tabLine,
            {
              width: tabWidth - 32,
              transform: [{ translateX: x.interpolate({ inputRange: [0, width], outputRange: [16, tabWidth + 16] }) }],
            },
          ]}
        />
      </View>

      <Pager
        ref={pager}
        waitFor={[communityChips, examplesRow, myChips]}
        scrollEnabled={!menu}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: true })}
        onMomentumScrollEnd={(e) => setTab(Math.round(e.nativeEvent.contentOffset.x / width))}
      >
        <View style={{ width }}>
          <CommunityPage
            columns={columns}
            cardWidth={cardWidth}
            bottom={insets.bottom}
            examplesStamp={examplesStamp}
            open={(to) => navigation.navigate('Circuit', to)}
            onMenu={openSharedMenu}
            locked={!!menu}
            chipsRef={communityChips}
            rowRef={examplesRow}
          />
        </View>

        <View style={{ width }}>
          <FilterRow
            choices={QUICK}
            on={quick}
            onPick={setQuick}
            count={filterCount}
            onFilter={() => setFilterOpen(true)}
            scrollRef={myChips}
          />
          <FlatList
            key={`mine-${columns}`}
            scrollEnabled={!menu}
            // Pulled down: the account's circuits come down, the phone's changes go up.
            refreshing={pulling}
            onRefresh={
              account.profile
                ? () => {
                    setPulling(true);
                    void syncNow().finally(() => setPulling(false));
                  }
                : undefined
            }
            data={shown}
            keyExtractor={(c) => c.id}
            numColumns={columns}
            columnWrapperStyle={s.gridRow}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 96 }}
            ListEmptyComponent={
              <Text style={s.note}>{circuits.length ? 'Nothing matches these filters' : 'No circuits yet'}</Text>
            }
            renderItem={({ item }) => <MyCard info={item} width={cardWidth} onOpen={openMine} onMenu={openMenu} />}
          />
          <Pressable
            style={[s.fab, { bottom: insets.bottom + 20 }]}
            onPress={() => void add()}
            accessibilityLabel="New circuit"
            android_ripple={{ color: '#3a3733', borderless: true, radius: 28 }}
          >
            <Icon name="plus" color="#fff" />
          </Pressable>
        </View>
      </Pager>

      <BottomSheet open={filterOpen} onClose={() => setFilterOpen(false)}>
        <SheetHead
          left="Reset"
          onLeft={() => {
            setSort('changed');
            setTags([]);
          }}
          title="Filter"
          right="Done"
          onRight={() => setFilterOpen(false)}
        />
        <ScrollView style={{ flexGrow: 0 }}>
          <Text style={s.sheetLabel}>Sort by</Text>
          <View style={s.rowsBox}>
            {SORTS.map((o, i) => (
              <Row
                key={o.key}
                first={i === 0}
                label={o.label}
                left={<Icon name={o.icon} color={C.ink2} />}
                right={sort === o.key ? <Icon name="check" color={C.ink} /> : undefined}
                onPress={() => setSort(o.key)}
              />
            ))}
          </View>
          {allTags.length > 0 && (
            <>
              <Text style={s.sheetLabel}>Tags</Text>
              <View style={s.tagWrap}>
                {allTags.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    on={tags.includes(t)}
                    onPress={() => setTags((now) => (now.includes(t) ? now.filter((x) => x !== t) : [...now, t]))}
                  />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </BottomSheet>

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
      <ExampleMaker />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  head: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  you: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  youCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.line },
  tab: { flex: 1, alignItems: 'center', paddingTop: 12, paddingBottom: 12 },
  tabText: { fontFamily: F.regular, fontSize: 15, color: C.ink3 },
  tabOn: { fontFamily: F.medium, color: C.ink },
  tabLine: { position: 'absolute', left: 0, bottom: -1, height: 2, backgroundColor: C.ink },
  hrow: { gap: 12, paddingHorizontal: 16, paddingBottom: 4 },
  by: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  byText: { flex: 1, fontFamily: F.regular, fontSize: 13, color: C.ink2 },
  search: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 6,
    height: 44,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line2,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: F.regular,
    fontSize: 15,
    color: C.ink,
  },
  section: {
    fontFamily: F.medium,
    fontSize: 13,
    color: C.ink3,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  gridRow: { gap: 12, paddingHorizontal: 16, marginBottom: 12 },
  note: { fontFamily: F.regular, fontSize: 15, color: C.ink3, padding: 24, textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.ink,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  sheetLabel: {
    fontFamily: F.medium,
    fontSize: 13,
    color: C.ink3,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  rowsBox: {
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    overflow: 'hidden',
  },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: 16, marginBottom: 8 },
});
