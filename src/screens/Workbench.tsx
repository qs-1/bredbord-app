// The workbench: the desk (the 3D view and simulator, in a web view) filling the screen, with the
// app's own bar, tools and sheets round it. The desk and the app talk in messages (src/embed.ts in
// the main project).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { note } from '../dialog';
import {
  Animated,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import Reanimated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { LegacyScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { useAssets } from 'expo-asset';
import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { createCircuit, freeName, getCircuit, readCircuit, saveCircuit, savePicture, updateCircuit } from '../circuits';
import { getShared } from '../community';
import { syncOnline } from '../sync';
import { EXAMPLES } from '../examples';
import { CATALOGUE, SECTIONS, type Tile } from '../generated/catalogue';
import { Icon, type IconName } from '../Px';
import { getSettings, useSettings } from '../settings';
import { Sheet, type SheetHandle } from '../Sheet';
import { C, F, R, WIRE, type WireColor } from '../theme';
import { ShareSheet } from '../ShareSheet';
import { BottomSheet, Chip, EASE, SheetHead } from '../ui';

/** A setting of the selected part, to choose from (the desk's `options`, src/embed-options.ts in the main project). */
interface DeskOption {
  id: string;
  label: string;
  /** 'choice' (one of), 'swatch' (one of, as colours), 'toggles' (each on or off: `current` is a bit mask). */
  look?: 'choice' | 'swatch' | 'toggles';
  choices: { value: string; label: string; color?: string }[];
  current: string;
}

/** The selected part's pins, pin 1 first: 'dip' drawn as a chip from above, 'list' one under another. */
interface DeskPins {
  names: string[];
  layout: 'dip' | 'list';
}

interface DeskState {
  selection: { title: string; count: number; ref?: string; sub?: string } | null;
  task: string;
  wire: boolean;
  color: WireColor;
  on: boolean;
  canUndo: boolean;
  canRedo: boolean;
  top: boolean;
  /** Settings of the one selected part; absent from desks built before they were sent. */
  options?: DeskOption[];
  /** The one selected part's pins, for its diagram. */
  pins?: DeskPins | null;
}

const IDLE: DeskState = {
  selection: null,
  task: '',
  wire: false,
  color: 'red',
  on: false,
  canUndo: false,
  canRedo: false,
  top: false,
};

/** The parts sheet's rows: a section's name, then its tiles a row at a time. */
type PartRow = { head: string } | { tiles: Tile[] };
function partRows(columns: number): PartRow[] {
  const rows: PartRow[] = [];
  for (const section of SECTIONS) {
    const tiles = CATALOGUE.filter((t) => t.section === section);
    if (!tiles.length) continue;
    rows.push({ head: section });
    for (let i = 0; i < tiles.length; i += columns) rows.push({ tiles: tiles.slice(i, i + columns) });
  }
  return rows;
}

const TOOLS_HEIGHT = 60;

/** The selection sheet: its grip and title row, and each option's row (a label over its choices). */
const CARD_HEAD = 58;
const CARD_SUB = 20;
const OPTION_ROW = 48;
const PINS_ROW = 44;
const PIN_ROW = 28;

/** How the colours panel and the hint come and go. */
const RISE = FadeInDown.duration(220);
const SINK = FadeOutDown.duration(160);

/** A tool on the bar; one that's on is drawn dark, so it reads at a glance. */
function Tool({
  icon,
  label,
  on,
  disabled,
  onPress,
}: {
  icon: IconName;
  label: string;
  on?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  const color = on ? C.ink : disabled ? C.line2 : C.ink2;
  return (
    <Pressable style={s.tool} onPress={onPress} disabled={disabled}>
      <View style={s.toolInner}>
        <View style={[s.toolTint, on && s.toolOn]} />
        <Icon name={icon} color={color} />
        <Text style={[s.toolText, { color }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

/**
 * A pin's name, with its bar (written Q\u03040 with a combining macron) drawn as a line over the whole
 * name it covers, as datasheets do, rather than left to the font, which puts it over the wrong letter.
 */
function PinName({ name }: { name: string }) {
  const m = /([A-Za-z])\u0304([A-Za-z0-9]*)/.exec(name);
  if (!m) {
    return (
      <Text style={s.pinName} numberOfLines={1}>
        {name}
      </Text>
    );
  }
  const before = name.slice(0, m.index);
  const after = name.slice(m.index + m[0].length);
  return (
    <View style={s.pinNameRow}>
      {!!before && <Text style={s.pinName}>{before}</Text>}
      <View style={s.pinBar}>
        <Text style={s.pinName}>{m[1] + m[2]}</Text>
      </View>
      {!!after && <Text style={s.pinName}>{after}</Text>}
    </View>
  );
}

/** A part's pins: a chip drawn from above (pin 1 top left, the notch at the top), or a list. A tap lights that pin's hole. */
function PinDiagram({ pins, lit, onPin }: { pins: DeskPins; lit: number | null; onPin: (i: number) => void }) {
  const pin = (i: number, side: 'l' | 'r' | 'list') => {
    const num = <Text style={[s.pinNum, lit === i && { color: C.ink }]}>{i + 1}</Text>;
    return (
      <Pressable
        key={i}
        onPress={() => onPin(i)}
        style={[s.pin, side === 'l' && { justifyContent: 'flex-end' }, lit === i && s.pinLit]}
      >
        {side !== 'l' && num}
        <PinName name={pins.names[i]} />
        {side === 'l' && num}
      </Pressable>
    );
  };
  if (pins.layout === 'list') return <View style={s.pinList}>{pins.names.map((_, i) => pin(i, 'list'))}</View>;
  const half = pins.names.length / 2;
  const left = Array.from({ length: half }, (_, k) => k);
  const right = Array.from({ length: half }, (_, k) => pins.names.length - 1 - k);
  return (
    <View style={s.dip}>
      <View style={s.dipSide}>{left.map((i) => pin(i, 'l'))}</View>
      <View style={s.dipBody}>
        <View style={s.dipNotch} />
      </View>
      <View style={s.dipSide}>{right.map((i) => pin(i, 'r'))}</View>
    </View>
  );
}

export function Workbench({ navigation, route }: NativeStackScreenProps<Screens, 'Workbench'>) {
  const { id, name, example, remote, keep, fresh } = route.params;
  // Its name, which can be changed from here: tapping the title.
  const [title, setTitle] = useState(name);
  const titleNow = useRef(name);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { width } = useWindowDimensions();
  const columns = Math.max(3, Math.floor((width - 16) / 116));
  const rows = useMemo(() => partRows(columns), [columns]);
  // A shared circuit being looked at: who made it and its description, for when it's kept as a remix.
  const sharedFrom = useRef<{ by: string; description: string } | null>(null);
  const settings = useSettings();
  const lastBump = useRef(0);
  const insets = useSafeAreaInsets();
  const [assets] = useAssets([require('../../assets/desk.html')]);
  const web = useRef<WebView<object>>(null);
  const parts = useRef<SheetHandle>(null);
  const card = useRef<SheetHandle>(null);
  const [state, setState] = useState<DeskState>(IDLE);
  const [partsOpen, setPartsOpen] = useState(false);
  // The part picked from the parts sheet that's waiting to be put down, shown in the hint bar (a phone has no hover).
  const [placing, setPlacing] = useState<Tile | null>(null);
  const [colours, setColours] = useState(false);
  // Framing the circuit's picture: the person moves the desk's view, and the picture keeps the 4:3 frame drawn over it.
  const [framing, setFraming] = useState(false);
  const [framed, setFramed] = useState(false);
  const [deskSize, setDeskSize] = useState({ w: 0, h: 0 });
  const [deskNote, setDeskNote] = useState('');
  const deskNoteA = useRef(new Animated.Value(0)).current;
  const deskNoteTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const say = (text: string): void => {
    setDeskNote(text);
    clearTimeout(deskNoteTimer.current);
    Animated.timing(deskNoteA, { toValue: 1, duration: 200, easing: EASE, useNativeDriver: true }).start();
    deskNoteTimer.current = setTimeout(
      () => Animated.timing(deskNoteA, { toValue: 0, duration: 220, easing: EASE, useNativeDriver: true }).start(),
      Math.min(4000, 1800 + text.length * 30),
    );
  };
  useEffect(() => () => clearTimeout(deskNoteTimer.current), []);
  const leaving = useRef(false);
  // An example that's only being looked at isn't one of the user's circuits: it gets its place in the
  // list (and an id) when it's first changed.
  const saved = useRef<Promise<string> | null>(id ? Promise.resolve(id) : null);

  const send = useCallback((message: object): void => {
    web.current?.injectJavaScript(`window.bredbord&&window.bredbord.send(${JSON.stringify(message)});true;`);
  }, []);

  // Changed by hand since the picture was last taken.
  const edited = useRef(false);

  // The circuit's picture is taken from above, and only when there's something new to show: it
  // changed since the last one, or it has none. A picture the person framed is left alone.
  // Resolves to whether the desk was asked.
  const refreshPicture = useCallback(async (): Promise<boolean> => {
    const to = await saved.current;
    if (!to) return false;
    const info = await getCircuit(to);
    if (!info || info.pictureCustom) return false;
    if (!edited.current && info.picture) return false;
    edited.current = false;
    send({ type: 'picture', view: 'top' });
    return true;
  }, [send]);

  const leave = useCallback((): void => {
    if (leaving.current) return;
    leaving.current = true;
    send({ type: 'deselect' });
    // The picture for the home screen is the last thing on the way out; leave anyway if the desk
    // doesn't answer. With nothing changed there's nothing to wait for.
    const waited = edited.current;
    void refreshPicture().then((asked) => setTimeout(() => navigation.goBack(), asked || waited ? 350 : 0));
  }, [navigation, send, refreshPicture]);

  // A new circuit is kept once something is put on it; an example or someone's shared circuit
  // becomes the user's own as a remix of it.
  const keepExample = (doc: unknown): Promise<string> =>
    freeName(titleNow.current).then((free) =>
      createCircuit(
        free,
        doc,
        fresh
          ? {}
          : {
              description:
                example !== undefined
                  ? (EXAMPLES[example]?.description ?? '')
                  : (sharedFrom.current?.description ?? ''),
              remixOf: remote ? { name, by: sharedFrom.current?.by ?? '', remote } : { name, by: 'Bredbord' },
            },
      ).then((info) => info.id),
    );

  const [shareId, setShareId] = useState<string | null>(null);
  // Sharing needs it kept first: something on the desk (or a name, for a new one).
  const share = async (): Promise<void> => {
    if (!saved.current) return say('Put something on the desk first, then share it');
    const to = await saved.current;
    // A current picture for its card in Community.
    void refreshPicture();
    setShareId(to);
  };

  const rename = (): void => {
    const next = newTitle.trim().slice(0, 60);
    setRenaming(false);
    if (!next || next === titleNow.current) return;
    titleNow.current = next;
    setTitle(next);
    // A new one that's been named is kept, empty or not. An example being looked at takes the name
    // when it's kept.
    if (!saved.current && fresh) saved.current = createCircuit(next).then((info) => info.id);
    else void saved.current?.then((to) => updateCircuit(to, { name: next }));
  };

  const startFraming = async (): Promise<void> => {
    if (!saved.current) return say('Put something on the desk first');
    send({ type: 'cancel' });
    send({ type: 'deselect' });
    parts.current?.go(0);
    const info = await getCircuit(await saved.current);
    setFramed(!!info?.pictureCustom);
    setFraming(true);
  };
  // The picture is the 4:3 middle of the desk, as the desk draws it (see `picture` in the website's view.ts).
  const frame = useMemo(() => {
    const { w, h } = deskSize;
    const cw = w / h < 4 / 3 ? w : (h * 4) / 3;
    const ch = (cw * 3) / 4;
    return { w: cw, h: ch, x: (w - cw) / 2, y: (h - ch) / 2 };
  }, [deskSize]);
  const takeFramed = (): void => {
    send({ type: 'picture', view: 'current' });
    setFraming(false);
  };
  const resetFramed = (): void => {
    send({ type: 'picture', view: 'top' });
    setFraming(false);
  };

  const deskSettings = useCallback(() => {
    const now = getSettings();
    send({ type: 'settings', graphics: now.graphics, magnifier: now.magnifier, pinNames: !now.hidePinNames });
  }, [send]);
  useEffect(deskSettings, [settings, deskSettings]);

  // The screen stays on while the circuit runs, if that's wanted.
  useEffect(() => {
    if (!(state.on && settings.keepAwake)) return;
    void activateKeepAwakeAsync('power');
    return () => void deactivateKeepAwake('power');
  }, [state.on, settings.keepAwake]);

  const onMessage = (e: WebViewMessageEvent): void => {
    let m: { type: string; [key: string]: unknown };
    try {
      m = JSON.parse(e.nativeEvent.data);
    } catch {
      return;
    }
    switch (m.type) {
      case 'ready':
        deskSettings();
        if (example !== undefined) send({ type: 'example', index: example });
        else if (remote)
          void getShared({ id: remote })
            .then((r) => {
              if (!r?.doc) return note('It couldn’t be opened');
              sharedFrom.current = { by: r.maker?.username ?? '', description: r.description };
              send({ type: 'load', doc: r.doc });
            })
            .catch(() => note('It couldn’t be opened. Are you online?'));
        else if (id) void readCircuit(id).then((doc) => doc && send({ type: 'load', doc }));
        return;
      case 'loaded':
        if (keep && !saved.current) saved.current = keepExample(m.doc);
        return;
      case 'bump': {
        edited.current = true;
        const now = Date.now();
        if (getSettings().vibrate && now - lastBump.current > 80) void Haptics.selectionAsync();
        lastBump.current = now;
        return;
      }
      case 'doc': {
        const doc = m.doc;
        if (saved.current) void saved.current.then((to) => saveCircuit(to, doc));
        else saved.current = keepExample(doc);
        return;
      }
      case 'state':
        setState(m as unknown as DeskState);
        return;
      case 'picture':
        // The picture is the last thing on the way out; a shared circuit's online copy follows.
        void saved.current?.then((to) =>
          savePicture(to, m.jpeg as string, m.view === 'current').then(() => syncOnline(to)),
        );
        return;
      case 'toast':
        // The desk's own messages ("No hole for the other leg there") show on the desk, at the top.
        return say(m.text as string);
    }
  };

  // The card comes up as a strip when something is selected and steps aside while something is put down.
  useEffect(() => {
    if (!state.task) setPlacing(null);
  }, [state.task]);
  const showCard = !!state.selection && !state.task && !partsOpen;

  // Back shuts what's open, one thing at a time, and then leaves.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (framing) setFraming(false);
      else if (colours) setColours(false);
      else if (partsOpen) parts.current?.go(0);
      else if (state.task) send({ type: 'cancel' });
      else if (state.selection) send({ type: 'deselect' });
      else leave();
      return true;
    });
    return () => sub.remove();
  }, [framing, colours, partsOpen, state.task, state.selection, send, leave]);

  const partStops = useMemo(() => [0, 320, 560] as const, []);
  // What floats over the desk sits above the tool bar.
  const above = TOOLS_HEIGHT + insets.bottom + 12;
  const one = !!state.selection && state.selection.count === 1;
  const options = one ? (state.options ?? []) : [];
  const pins = one ? (state.pins ?? null) : null;
  // The card holds only settings and pins: with neither, there's no card, just the buttons on the right.
  const hasCard = options.length > 0 || !!pins;
  const pinRows = pins ? (pins.layout === 'dip' ? pins.names.length / 2 : pins.names.length) : 0;
  const sub = state.selection?.sub;
  const cardStops = useMemo(() => {
    const base = CARD_HEAD + (sub ? CARD_SUB : 0) + options.length * OPTION_ROW + (pins ? PINS_ROW : 0) + 8;
    return pins ? [0, base, base + Math.min(pinRows * PIN_ROW + 12, 360)] : [0, base];
  }, [options.length, pins, pinRows, sub]);
  const [cardAt, setCardAt] = useState(0);
  const [pinAt, setPinAt] = useState<number | null>(null);
  // A new selection starts with its pins folded and none of them lit.
  const selectionKey = `${state.selection?.title}|${state.selection?.ref}|${state.selection?.count}`;
  useEffect(() => {
    setPinAt(null);
    send({ type: 'pin', index: null });
  }, [selectionKey, send]);
  useEffect(() => card.current?.go(showCard && hasCard ? 1 : 0), [showCard, hasCard, cardStops, selectionKey]);
  const cardTop = showCard && hasCard ? (cardStops[cardAt] ?? cardStops[1]) : 0;
  const tapPin = (i: number): void => {
    const next = pinAt === i ? null : i;
    setPinAt(next);
    send({ type: 'pin', index: next });
  };
  const uri = assets?.[0]?.localUri;

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <View style={s.bar}>
        <Pressable style={s.icon} onPress={leave} android_ripple={{ color: C.press, borderless: true }}>
          <Icon name="chevl" color={C.ink} />
        </Pressable>
        <Pressable
          style={s.titleBox}
          onPress={() => {
            setNewTitle(titleNow.current);
            setRenaming(true);
          }}
          accessibilityLabel="Rename"
        >
          <Text style={s.title} numberOfLines={1}>
            {title}
          </Text>
        </Pressable>
        <Pressable
          style={s.icon}
          onPress={() => void share()}
          accessibilityLabel="Share"
          android_ripple={{ color: C.press, borderless: true }}
        >
          <Icon name="share" color={C.ink} />
        </Pressable>
        <Pressable
          style={[s.power, state.on && { backgroundColor: C.ink, borderColor: C.ink }]}
          onPress={() => send({ type: 'power' })}
          android_ripple={{ color: C.press }}
        >
          <Icon name="power" color={state.on ? '#fff' : C.ink} />
          <Text style={[s.powerText, state.on && { color: '#fff' }]}>{state.on ? 'Power off' : 'Power on'}</Text>
        </Pressable>
      </View>

      <View
        style={s.desk}
        onLayout={(e) => setDeskSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      >
        {uri && (
          <WebView<object>
            ref={web}
            source={{ uri }}
            originWhitelist={['*']}
            allowFileAccess
            allowFileAccessFromFileURLs
            javaScriptEnabled
            domStorageEnabled={false}
            overScrollMode="never"
            bounces={false}
            setBuiltInZoomControls={false}
            textZoom={100}
            style={{ backgroundColor: C.desk }}
            onMessage={onMessage}
          />
        )}
        {!!deskNote && (
          <Animated.View
            pointerEvents="none"
            style={[
              s.deskNote,
              {
                opacity: deskNoteA,
                transform: [{ translateY: deskNoteA.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
              },
            ]}
          >
            <Icon name="warn" color="#fff" />
            <Text style={s.deskNoteText}>{deskNote}</Text>
          </Animated.View>
        )}
        <View style={s.view}>
          <Pressable style={s.viewBtn} onPress={() => send({ type: 'top', on: !state.top })}>
            <Icon name={state.top ? 'cube' : 'topview'} color={C.ink} />
          </Pressable>
          <View style={s.viewLine} />
          <Pressable style={s.viewBtn} onPress={() => send({ type: 'fit' })}>
            <Icon name="fit" color={C.ink} />
          </Pressable>
          <View style={s.viewLine} />
          <Pressable style={s.viewBtn} onPress={() => void startFraming()} accessibilityLabel="Set the preview picture">
            <Icon name="marquee" color={C.ink} />
          </Pressable>
        </View>
        {framing && (
          <>
            <View pointerEvents="none" style={[s.dim, { left: 0, right: 0, top: 0, height: frame.y }]} />
            <View pointerEvents="none" style={[s.dim, { left: 0, right: 0, bottom: 0, top: frame.y + frame.h }]} />
            <View pointerEvents="none" style={[s.dim, { left: 0, width: frame.x, top: frame.y, height: frame.h }]} />
            <View pointerEvents="none" style={[s.dim, { right: 0, width: frame.x, top: frame.y, height: frame.h }]} />
            <View
              pointerEvents="none"
              style={[s.frameLine, { left: frame.x, top: frame.y, width: frame.w, height: frame.h }]}
            />
            <Reanimated.View
              entering={RISE}
              exiting={SINK}
              style={[s.hint, { bottom: above, flexWrap: 'wrap', justifyContent: 'flex-end' }]}
            >
              <Text style={[s.hintText, { flexBasis: '100%' }]}>Move the view so the preview shows what you want</Text>
              <Pressable style={s.hintCancel} onPress={() => setFraming(false)}>
                <Text style={s.hintCancelText}>Cancel</Text>
              </Pressable>
              {framed && (
                <Pressable style={s.hintCancel} onPress={resetFramed}>
                  <Text style={s.hintCancelText}>Reset</Text>
                </Pressable>
              )}
              <Pressable style={s.hintCancel} onPress={takeFramed}>
                <Text style={[s.hintCancelText, { color: '#fff' }]}>Use this view</Text>
              </Pressable>
            </Reanimated.View>
          </>
        )}
        {!!state.task && (
          <Reanimated.View entering={RISE} exiting={SINK} style={[s.hint, { bottom: above }]}>
            {placing && (
              <View style={s.hintThumb}>
                <SvgXml xml={placing.svg} width={40} height={30} />
              </View>
            )}
            <View style={s.hintBody}>
              {placing && (
                <Text style={s.hintName} numberOfLines={1}>
                  {placing.name}
                </Text>
              )}
              <Text style={[s.hintText, placing && s.hintTextSub]}>{state.task}</Text>
            </View>
            <Pressable style={s.hintCancel} onPress={() => send({ type: 'cancel' })}>
              <Text style={s.hintCancelText}>Cancel</Text>
            </Pressable>
          </Reanimated.View>
        )}
        {showCard && (
          <Reanimated.View entering={RISE} exiting={SINK} style={[s.rail, { bottom: above + cardTop }]}>
            <Pressable
              style={s.railBtn}
              onPress={() => send({ type: 'rotate' })}
              accessibilityLabel="Rotate"
              android_ripple={{ color: C.press }}
            >
              <Icon name="rotate" color={C.ink} />
            </Pressable>
            <Pressable
              style={[s.railBtn, s.railLine]}
              onPress={() => send({ type: 'duplicate' })}
              accessibilityLabel="Duplicate"
              android_ripple={{ color: C.press }}
            >
              <Icon name="duplicate" color={C.ink} />
            </Pressable>
            <Pressable
              style={[s.railBtn, s.railLine]}
              onPress={() => send({ type: 'delete' })}
              accessibilityLabel="Delete"
              android_ripple={{ color: C.press }}
            >
              <Icon name="trash" color={C.bad} />
            </Pressable>
          </Reanimated.View>
        )}
        {colours && (
          <Reanimated.View entering={RISE} exiting={SINK} style={[s.colours, { bottom: above + cardTop }]}>
            {(Object.keys(WIRE) as WireColor[]).map((c) => (
              <Pressable
                key={c}
                style={[s.swatchBox, state.color === c && { borderColor: C.ink }]}
                onPress={() => {
                  send({ type: 'color', color: c });
                  setColours(false);
                }}
              >
                <View style={[s.swatch, { backgroundColor: WIRE[c] }]} />
              </Pressable>
            ))}
          </Reanimated.View>
        )}
      </View>

      <Sheet
        ref={card}
        stops={cardStops}
        bottom={TOOLS_HEIGHT + insets.bottom}
        onSettle={(i) => {
          setCardAt(i);
          if (i === 0 && state.selection && hasCard) send({ type: 'deselect' });
        }}
        header={
          <View style={s.cardHead}>
            <View style={s.cardTitleRow}>
              <Text style={s.cardTitle} numberOfLines={1}>
                {state.selection?.title ?? ''}
              </Text>
              {!!state.selection?.ref && <Text style={s.cardRef}>{state.selection.ref}</Text>}
            </View>
            {!!sub && <Text style={s.cardSub}>{sub}</Text>}
          </View>
        }
      >
        <View>
          {options.map((o) => (
            <View key={o.id} style={s.option}>
              <Text style={s.optionLabel}>{o.label}</Text>
              <LegacyScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                contentContainerStyle={s.optionChoices}
              >
                {o.choices.map((c) =>
                  o.look === 'swatch' ? (
                    <Pressable
                      key={c.value}
                      accessibilityLabel={c.label}
                      style={[s.swatchBox, c.value === o.current && { borderColor: C.ink }]}
                      onPress={() => send({ type: 'option', id: o.id, value: c.value })}
                    >
                      <View style={[s.swatch, { backgroundColor: c.color }]} />
                    </Pressable>
                  ) : (
                    <Chip
                      key={c.value}
                      label={c.label}
                      on={
                        o.look === 'toggles'
                          ? ((Number(o.current) >> Number(c.value)) & 1) === 1
                          : c.value === o.current
                      }
                      onPress={() => send({ type: 'option', id: o.id, value: c.value })}
                    />
                  ),
                )}
              </LegacyScrollView>
            </View>
          ))}
          {pins && (
            <>
              <Pressable style={s.pinsFold} onPress={() => card.current?.go(cardAt === 2 ? 1 : 2)}>
                <Text style={s.pinsFoldText}>Pins</Text>
                <View style={{ transform: [{ rotate: cardAt === 2 ? '180deg' : '0deg' }] }}>
                  <Icon name="chev" color={C.ink2} />
                </View>
              </Pressable>
              <PinDiagram pins={pins} lit={pinAt} onPin={tapPin} />
            </>
          )}
        </View>
      </Sheet>

      <Sheet
        ref={parts}
        stops={partStops}
        bottom={TOOLS_HEIGHT + insets.bottom}
        onSettle={(i) => setPartsOpen(i > 0)}
        header={<Text style={s.sheetTitle}>Parts</Text>}
      >
        <FlatList
          data={rows}
          keyExtractor={(r) => ('head' in r ? r.head : r.tiles[0].id)}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          renderItem={({ item }) =>
            'head' in item ? (
              <Text style={s.partHead}>{item.head}</Text>
            ) : (
              <View style={s.tileRow}>
                {Array.from({ length: columns }, (_, i) => item.tiles[i]).map((t, i) =>
                  t ? (
                    <Pressable
                      key={t.id}
                      style={s.tile}
                      onPress={() => {
                        parts.current?.go(0);
                        setPlacing(t);
                        send(t.send);
                      }}
                      android_ripple={{ color: C.press }}
                    >
                      <SvgXml xml={t.svg} width={56} height={42} />
                      <Text style={s.tileName} numberOfLines={1}>
                        {t.name}
                      </Text>
                      <Text style={s.tileSub} numberOfLines={1}>
                        {t.sub}
                      </Text>
                    </Pressable>
                  ) : (
                    <View key={i} style={[s.tile, { borderColor: 'transparent' }]} />
                  ),
                )}
              </View>
            )
          }
        />
      </Sheet>

      <ShareSheet id={shareId} open={!!shareId} onClose={() => setShareId(null)} />
      <BottomSheet open={renaming} onClose={() => setRenaming(false)}>
        <SheetHead left="Cancel" onLeft={() => setRenaming(false)} title="Name" right="Save" onRight={rename} />
        <TextInput
          style={s.input}
          value={newTitle}
          onChangeText={setNewTitle}
          maxLength={60}
          autoFocus
          selectTextOnFocus
          returnKeyType="done"
          onSubmitEditing={rename}
        />
      </BottomSheet>

      <View style={[s.tools, { paddingBottom: insets.bottom, height: TOOLS_HEIGHT + insets.bottom }]}>
        <Tool icon="chip" label="Parts" on={partsOpen} onPress={() => parts.current?.go(partsOpen ? 0 : 1)} />
        <Tool icon="wire" label="Wire" on={state.wire} onPress={() => send({ type: 'wire' })} />
        <Pressable style={s.tool} onPress={() => setColours((v) => !v)}>
          <View style={s.toolInner}>
            <View style={[s.toolTint, colours && s.toolOn]} />
            <View style={[s.swatch, { backgroundColor: WIRE[state.color] }]} />
            <Text style={[s.toolText, colours && { color: C.ink }]}>Colour</Text>
          </View>
        </Pressable>
        <Tool icon="undo" label="Undo" disabled={!state.canUndo} onPress={() => send({ type: 'undo' })} />
        <Tool icon="redo" label="Redo" disabled={!state.canRedo} onPress={() => send({ type: 'redo' })} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  icon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  titleBox: { flex: 1, height: 48, justifyContent: 'center', marginRight: 8 },
  title: { fontFamily: F.medium, fontSize: 16, color: C.ink },
  input: {
    marginHorizontal: 16,
    height: 48,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line2,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: F.regular,
    fontSize: 16,
    color: C.ink,
  },
  power: {
    height: 40,
    width: 128,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: R.control,
    borderWidth: 1,
    borderColor: C.line2,
    backgroundColor: C.card,
  },
  powerText: { fontFamily: F.medium, fontSize: 14, color: C.ink },
  desk: { flex: 1, backgroundColor: C.desk },
  view: {
    position: 'absolute',
    left: 12,
    top: 12,
    borderRadius: R.control,
    borderWidth: 1,
    borderColor: C.line2,
    backgroundColor: C.card,
  },
  viewBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  viewLine: { height: 1, backgroundColor: C.line },
  dim: { position: 'absolute', backgroundColor: 'rgba(20,20,20,0.45)' },
  frameLine: { position: 'absolute', borderWidth: 2, borderColor: '#fff' },
  deskNote: {
    position: 'absolute',
    top: 12,
    left: 70,
    right: 12,
    minHeight: 44,
    borderRadius: R.control,
    backgroundColor: C.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  deskNoteText: { flex: 1, fontFamily: F.regular, fontSize: 14, lineHeight: 19, color: '#fff' },
  hint: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    minHeight: 48,
    borderRadius: R.control,
    backgroundColor: C.ink,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 6,
  },
  hintThumb: {
    width: 48,
    height: 36,
    borderRadius: 4,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hintBody: { flex: 1, paddingVertical: 8 },
  hintName: { fontFamily: F.medium, fontSize: 14, color: '#fff' },
  hintText: { fontFamily: F.regular, fontSize: 14, color: '#fff' },
  hintTextSub: { fontSize: 13, color: '#d8d4cc' },
  hintCancel: { height: 36, paddingHorizontal: 12, justifyContent: 'center', borderRadius: 4 },
  hintCancelText: { fontFamily: F.medium, fontSize: 14, color: '#d8d4cc' },
  colours: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    padding: 8,
    borderRadius: R.card,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 6,
  },
  swatchBox: {
    width: 36,
    height: 36,
    borderRadius: R.control,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatch: { width: 20, height: 20, borderRadius: 3, borderWidth: 1, borderColor: C.line2 },
  tools: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: C.bar,
    borderTopWidth: 1,
    borderTopColor: C.line,
    elevation: 16,
  },
  tool: { flex: 1, height: TOOLS_HEIGHT, alignItems: 'center', justifyContent: 'center' },
  toolInner: {
    width: '86%',
    height: TOOLS_HEIGHT - 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  // A soft tint, not a black block: the tool is on, the desk is still what's looked at.
  // The tint is always there, rounded from the start, and only shows when the tool is on: Android drops
  // the rounding of a view whose background colour is added after it was first drawn.
  toolTint: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 12,
    backgroundColor: C.press,
    opacity: 0,
  },
  toolOn: { opacity: 1 },
  toolText: { fontFamily: F.regular, fontSize: 12, color: C.ink2 },
  sheetTitle: { fontFamily: F.medium, fontSize: 16, color: C.ink, paddingHorizontal: 16, paddingBottom: 10 },
  partHead: {
    fontFamily: F.medium,
    fontSize: 13,
    color: C.ink3,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 6,
  },
  tileRow: { flexDirection: 'row' },
  tile: {
    flex: 1,
    margin: 4,
    minHeight: 68,
    padding: 10,
    borderRadius: R.control,
    borderWidth: 1,
    borderColor: C.line,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tileName: { fontFamily: F.medium, fontSize: 14, color: C.ink, textAlign: 'center' },
  tileSub: { fontFamily: F.regular, fontSize: 12, color: C.ink3, textAlign: 'center' },
  cardHead: { paddingHorizontal: 16, paddingBottom: 6, minHeight: 34, justifyContent: 'center' },
  cardTitleRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  cardTitle: { flexShrink: 1, fontFamily: F.medium, fontSize: 16, color: C.ink },
  cardRef: { fontFamily: F.regular, fontSize: 13, color: C.ink3 },
  cardSub: { fontFamily: F.regular, fontSize: 13, color: C.ink3, marginTop: 1 },
  // A setting: its name on the left, the choices beside it, scrolling sideways when they don't fit.
  option: {
    height: OPTION_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: C.line,
  },
  optionLabel: { width: 92, fontFamily: F.regular, fontSize: 13, color: C.ink2, paddingLeft: 16 },
  optionChoices: { gap: 6, paddingRight: 16, alignItems: 'center' },
  rail: {
    position: 'absolute',
    right: 10,
    backgroundColor: C.card,
    borderRadius: R.card,
    borderWidth: 1,
    borderColor: C.line2,
    overflow: 'hidden',
    elevation: 4,
  },
  railBtn: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  railLine: { borderTopWidth: 1, borderTopColor: C.line },
  pinsFold: {
    height: PINS_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: C.line,
  },
  pinsFoldText: { fontFamily: F.regular, fontSize: 14, color: C.ink },
  dip: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  dipSide: { flex: 1 },
  dipBody: { width: 52, borderWidth: 1.5, borderColor: C.ink, borderRadius: 3, alignItems: 'center' },
  dipNotch: {
    width: 14,
    height: 7,
    marginTop: -1.5,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: C.ink,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: C.card,
  },
  pinList: { paddingHorizontal: 16, paddingBottom: 12 },
  pin: { height: PIN_ROW, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4, borderRadius: 4 },
  // The pin tapped: the same amber as its hole on the board.
  pinLit: { backgroundColor: '#fbefd2' },
  pinNum: { fontFamily: F.mono, fontSize: 11, color: C.ink3, minWidth: 16, textAlign: 'center' },
  pinName: { fontFamily: F.regular, fontSize: 13, color: C.ink, flexShrink: 1 },
  pinNameRow: { flexDirection: 'row', alignItems: 'center' },
  pinBar: { borderTopWidth: 1, borderTopColor: C.ink, marginTop: 1 },
});
