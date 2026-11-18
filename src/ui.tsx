// The pieces the screens share: the circuit card, the filter row, sheets, the long-press menu, rows
// and buttons. Looks follow mobile/mockups/screens.html.
import { memo, useEffect, useRef, useState, type ComponentRef, type ReactNode, type Ref } from 'react';
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ScrollView,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LegacyScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Overlay } from './overlay';
import { PartPicture } from './PartPicture';
import { Icon, type IconName } from './Px';
import { C, F, R } from './theme';

export const EASE = Easing.bezier(0.22, 1, 0.36, 1);

// ---------- The card ----------

export interface CardProps {
  picture: string | null;
  chips: string[];
  title: string;
  remix?: boolean;
  description?: string;
  /** The line under it: who made it, or when it changed. */
  foot?: ReactNode;
  width?: number;
  onPress: () => void;
  /** With where the card sits on screen, so the menu can lift it. */
  onLongPress?: (at: { x: number; y: number; width: number; height: number }) => void;
}

export const Card = memo(function Card(p: CardProps) {
  const box = useRef<ComponentRef<typeof View>>(null);
  return (
    <Pressable
      ref={box}
      onPress={p.onPress}
      onLongPress={
        p.onLongPress &&
        (() => box.current?.measureInWindow((x, y, width, height) => p.onLongPress?.({ x, y, width, height })))
      }
      delayLongPress={350}
      style={({ pressed }) => [
        s.card,
        p.width ? { width: p.width } : { flex: 1 },
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
    >
      <CardBody {...p} />
    </Pressable>
  );
});

/** What's in a card, also drawn lifted over the long-press menu. */
export function CardBody(p: CardProps) {
  return (
    <>
      <View style={s.pic}>{p.picture ? <Image source={{ uri: p.picture }} style={s.picImage} /> : null}</View>
      <View style={s.meta}>
        <Text style={s.chips} numberOfLines={1}>
          {p.chips.length ? p.chips.join('  ') : ' '}
        </Text>
        <View style={s.titleRow}>
          {p.remix && (
            <View style={s.mark} accessibilityLabel="Remix">
              <Icon name="remix" color={C.ink3} size={1.5} />
            </View>
          )}
          <Text style={s.title} numberOfLines={1}>
            {p.title}
          </Text>
        </View>
        {!!p.description && (
          <Text style={s.desc} numberOfLines={2}>
            {p.description}
          </Text>
        )}
        {typeof p.foot === 'string' ? (
          <Text style={s.desc} numberOfLines={2}>
            {p.foot}
          </Text>
        ) : (
          p.foot
        )}
      </View>
    </>
  );
}

/** How many cards fit across: at least about 160 wide each, so landscape gets more, not bigger. */
export function useColumns(padding = 16, gap = 12): { columns: number; cardWidth: number } {
  const { width } = useWindowDimensions();
  const inner = width - padding * 2;
  const columns = Math.max(2, Math.floor((inner + gap) / (160 + gap)));
  return { columns, cardWidth: (inner - gap * (columns - 1)) / columns };
}

// ---------- People ----------

/** A person's picture: a part, given at random when they join (an LED, a chip and so on). */
export function Person({ part, size }: { part: string; size: number }) {
  return (
    <View style={[s.person, { width: size, height: size, borderRadius: size / 2 }]}>
      <PartPicture id={part} width={size * 0.9} />
    </View>
  );
}

// ---------- The filter row ----------

/**
 * Filter stays put at the left; the quick choices scroll beside it. `scrollRef` lets the home pages'
 * swiping wait for it, so a swipe on the choices scrolls them instead of changing page.
 */
export function FilterRow({
  choices,
  on,
  onPick,
  count,
  onFilter,
  scrollRef,
}: {
  choices: string[];
  on: number;
  onPick: (i: number) => void;
  count: number;
  onFilter: () => void;
  scrollRef?: Ref<ComponentRef<typeof ScrollView>>;
}) {
  return (
    <View style={s.filters}>
      <Pressable style={[s.chip, s.filterBtn]} onPress={onFilter} android_ripple={{ color: C.press }}>
        <Icon name="sliders" color={C.ink} />
        <Text style={[s.chipText, { color: C.ink, fontFamily: F.medium }]}>Filter</Text>
        {count > 0 && (
          <View style={s.badge}>
            <Text style={s.badgeText}>{count}</Text>
          </View>
        )}
      </Pressable>
      <LegacyScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        // Android's stretch at the ends got stuck when the pages behind took the swipe.
        overScrollMode="never"
        contentContainerStyle={s.chipsScroll}
      >
        {choices.map((c, i) => (
          <Chip key={c} label={c} on={i === on} onPress={() => onPick(i)} />
        ))}
      </LegacyScrollView>
    </View>
  );
}

export function Chip({
  label,
  on,
  onPress,
  right,
}: {
  label: string;
  on?: boolean;
  onPress?: () => void;
  right?: ReactNode;
}) {
  return (
    <Pressable style={[s.chip, on && s.chipOn]} onPress={onPress} disabled={!onPress}>
      <Text style={[s.chipText, on && { color: '#fff' }]}>{label}</Text>
      {right}
    </Pressable>
  );
}

// ---------- Sheets ----------

/** How the sheets move: in gently, out a little quicker. */
const IN = { duration: 320, easing: EASE, useNativeDriver: true };
const OUT = { duration: 220, easing: Easing.bezier(0.3, 0, 0.8, 0.15), useNativeDriver: true };

/** A sheet that slides up over a dimmed screen, and above the keyboard when there is one. */
export function BottomSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const [shown, setShown] = useState(open);
  useEffect(() => {
    if (open) setShown(true);
  }, [open]);
  if (!shown && !open) return null;
  return (
    <Overlay onBack={onClose}>
      <Sheet open={open} onClose={onClose} onGone={() => setShown(false)}>
        {children}
      </Sheet>
    </Overlay>
  );
}

function Sheet({
  open,
  onClose,
  onGone,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onGone: () => void;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const { height: screen } = useWindowDimensions();
  const a = useRef(new Animated.Value(0)).current;
  const [keyboard, setKeyboard] = useState(() => (Keyboard.isVisible() ? (Keyboard.metrics()?.height ?? 0) : 0));
  const lift = useRef(new Animated.Value(keyboard)).current;
  const [height, setHeight] = useState(0);
  const measured = height > 0;

  useEffect(() => {
    if (open) {
      if (measured) Animated.timing(a, { toValue: 1, ...IN }).start();
    } else if (!measured) onGone();
    else Animated.timing(a, { toValue: 0, ...OUT }).start(({ finished }) => finished && onGone());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, measured]);

  // Android tells the app the keyboard's height once it's up; the sheet rises to sit on it.
  useEffect(() => {
    const to = (h: number): void => {
      setKeyboard(h);
      Animated.timing(lift, { toValue: h, duration: 200, easing: EASE, useNativeDriver: true }).start();
    };
    const up = Keyboard.addListener('keyboardDidShow', (e) => to(e.endCoordinates.height));
    const down = Keyboard.addListener('keyboardDidHide', () => to(0));
    return () => {
      up.remove();
      down.remove();
    };
  }, [lift]);

  const away = (height || screen) + 24;
  return (
    <View style={s.fill} pointerEvents={open ? 'auto' : 'none'}>
      <Animated.View style={[s.fill, s.dim, { opacity: a }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        style={[
          s.sheet,
          { paddingBottom: insets.bottom + 16, maxHeight: screen - keyboard - insets.top - 24 },
          {
            transform: [
              { translateY: Animated.subtract(a.interpolate({ inputRange: [0, 1], outputRange: [away, 0] }), lift) },
            ],
          },
        ]}
      >
        <View style={s.grab} />
        {children}
      </Animated.View>
    </View>
  );
}

/** Left action, title, right action, as on Apple's own sheets. */
export function SheetHead({
  left,
  onLeft,
  title,
  right,
  onRight,
}: {
  left: string;
  onLeft: () => void;
  title: string;
  right: string;
  onRight: () => void;
}) {
  return (
    <View style={s.sheetHead}>
      {/* The title sits in the middle of the sheet, whatever the words either side of it. */}
      <Text style={s.sheetTitle} numberOfLines={1}>
        {title}
      </Text>
      {left ? (
        <Pressable onPress={onLeft} hitSlop={12}>
          <Text style={s.sheetLeft}>{left}</Text>
        </Pressable>
      ) : (
        <View />
      )}
      <Pressable onPress={onRight} hitSlop={12}>
        <Text style={s.sheetRight}>{right}</Text>
      </Pressable>
    </View>
  );
}

// ---------- The long-press menu ----------

export interface MenuItem {
  label: string;
  icon: IconName;
  bad?: boolean;
  onPress: () => void;
}

type At = { x: number; y: number; width: number; height: number };

/** The screen dims, the card lifts a little where it sat, and a short menu shows beside it. */
export function LiftMenu({
  at,
  card,
  items,
  onClose,
}: {
  at: At | null;
  card: CardProps | null;
  items: MenuItem[];
  onClose: () => void;
}) {
  // What it showed, kept while it fades away after closing.
  const [last, setLast] = useState<{ at: At; card: CardProps; items: MenuItem[] } | null>(null);
  const open = !!at && !!card;
  useEffect(() => {
    if (at && card) setLast({ at, card, items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at, card]);
  const shown = at && card ? { at, card, items } : last;
  if (!shown) return null;
  return (
    <Overlay onBack={onClose}>
      <Lift {...shown} open={open} onClose={onClose} onGone={() => setLast(null)} />
    </Overlay>
  );
}

function Lift({
  at,
  card,
  items,
  open,
  onClose,
  onGone,
}: {
  at: At;
  card: CardProps;
  items: MenuItem[];
  open: boolean;
  onClose: () => void;
  onGone: () => void;
}) {
  const { height, width } = useWindowDimensions();
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (open) Animated.timing(a, { toValue: 1, duration: 260, easing: EASE, useNativeDriver: true }).start();
    else
      Animated.timing(a, { toValue: 0, duration: 160, easing: EASE, useNativeDriver: true }).start(
        ({ finished }) => finished && onGone(),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const menuHeight = items.length * 48;
  const below = at.y + at.height + 12 + menuHeight < height - 24;
  const menuTop = below ? at.y + at.height + 12 : Math.max(24, at.y - menuHeight - 12);
  const menuLeft = Math.min(Math.max(16, at.x + at.width - 220), width - 236);
  return (
    <View style={s.fill} pointerEvents={open ? 'auto' : 'none'}>
      <Animated.View style={[s.fill, s.dim, { opacity: a }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          s.card,
          s.lifted,
          { position: 'absolute', left: at.x, top: at.y, width: at.width },
          { transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1.04] }) }] },
        ]}
      >
        <CardBody {...card} />
      </Animated.View>
      <Animated.View
        style={[
          s.menu,
          {
            top: menuTop,
            left: menuLeft,
            opacity: a,
            transform: [
              { translateY: a.interpolate({ inputRange: [0, 1], outputRange: [below ? -10 : 10, 0] }) },
              { scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) },
            ],
          },
        ]}
      >
        {items.map((it, i) => (
          <Pressable
            key={it.label}
            style={[s.menuRow, i > 0 && s.rowLine]}
            android_ripple={{ color: C.press }}
            onPress={() => {
              onClose();
              it.onPress();
            }}
          >
            <Text style={[s.menuText, it.bad && { color: C.bad }]}>{it.label}</Text>
            <Icon name={it.icon} color={it.bad ? C.bad : C.ink2} />
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

// ---------- Rows and buttons ----------

export function Group({
  label,
  children,
  style,
}: {
  label?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ marginHorizontal: 16, marginBottom: 20 }, style]}>
      {!!label && <Text style={s.groupLabel}>{label}</Text>}
      <View style={s.rows}>{children}</View>
    </View>
  );
}

export function Row({
  label,
  sub,
  first,
  left,
  right,
  value,
  chevron,
  bad,
  onPress,
}: {
  label: string;
  sub?: string;
  first?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  value?: string;
  chevron?: boolean;
  bad?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[s.row, !first && s.rowLine, bad && { justifyContent: 'center' }]}
      onPress={onPress}
      disabled={!onPress}
      android_ripple={{ color: C.press }}
    >
      {left}
      <View style={bad ? undefined : { flex: 1 }}>
        <Text style={[s.rowText, bad && { color: C.bad }]}>{label}</Text>
        {!!sub && <Text style={s.rowSub}>{sub}</Text>}
      </View>
      {!!value && <Text style={s.rowValue}>{value}</Text>}
      {right}
      {chevron && <Icon name="chevr" color={C.ink3} />}
    </Pressable>
  );
}

/** A tick box (no switches: docs/DESIGN.md section 11). */
export function Tick({ on }: { on: boolean }) {
  return <View style={[s.tick, on && s.tickOn]}>{on && <Icon name="check" color="#fff" size={1.6} />}</View>;
}

export function Button({
  label,
  icon,
  main,
  onPress,
  style,
}: {
  label?: string;
  icon?: IconName;
  main?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      style={[s.btn, main && s.btnMain, !label && { width: 48, flex: 0 }, style]}
      onPress={onPress}
      android_ripple={{ color: main ? '#3a3733' : C.press }}
      accessibilityLabel={label}
    >
      {icon && <Icon name={icon} color={main ? '#fff' : C.ink} />}
      {!!label && <Text style={[s.btnText, main && { color: '#fff' }]}>{label}</Text>}
    </Pressable>
  );
}

export function IconButton({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable
      style={s.iconBtn}
      onPress={onPress}
      accessibilityLabel={label}
      android_ripple={{ color: C.press, borderless: true, radius: 22 }}
    >
      <Icon name={icon} color={C.ink2} />
    </Pressable>
  );
}

export const s = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    padding: 6,
  },
  lifted: { elevation: 16 },
  pic: { aspectRatio: 4 / 3, borderRadius: 8, overflow: 'hidden', backgroundColor: C.desk },
  picImage: { width: '100%', height: '100%' },
  meta: { paddingHorizontal: 4, paddingTop: 8, paddingBottom: 4, gap: 2 },
  chips: { fontFamily: F.mono, fontSize: 12, color: C.ink3 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  mark: { marginRight: 5 },
  title: { flex: 1, fontFamily: F.medium, fontSize: 15, color: C.ink },
  desc: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: C.ink2 },
  person: { backgroundColor: C.raised, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: C.line,
    paddingTop: 14,
    paddingBottom: 12,
  },
  filterBtn: { marginLeft: 16 },
  chipsScroll: { gap: 8, paddingLeft: 8, paddingRight: 16 },
  chip: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: R.control,
    borderWidth: 1,
    borderColor: C.line2,
    backgroundColor: C.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipOn: { backgroundColor: C.ink, borderColor: C.ink },
  chipText: { fontFamily: F.regular, fontSize: 14, color: C.ink2 },
  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: C.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: F.medium, fontSize: 12, color: '#fff' },
  fill: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
  dim: { backgroundColor: 'rgba(31,29,26,0.38)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '88%',
    backgroundColor: C.bar,
    borderTopLeftRadius: R.sheet,
    borderTopRightRadius: R.sheet,
    elevation: 24,
  },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: C.line2, alignSelf: 'center', marginTop: 8 },
  sheetHead: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  sheetTitle: {
    position: 'absolute',
    left: 88,
    right: 88,
    fontFamily: F.medium,
    fontSize: 17,
    color: C.ink,
    textAlign: 'center',
  },
  sheetLeft: { fontFamily: F.regular, fontSize: 15, color: C.ink2 },
  sheetRight: { fontFamily: F.medium, fontSize: 15, color: C.ink },
  plain: { height: 48, alignItems: 'center', justifyContent: 'center' },
  plainText: { fontFamily: F.regular, fontSize: 15, color: C.ink2 },
  menu: {
    position: 'absolute',
    width: 220,
    backgroundColor: C.card,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 12,
  },
  menuRow: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: { fontFamily: F.regular, fontSize: 15, color: C.ink },
  groupLabel: { fontFamily: F.medium, fontSize: 13, color: C.ink3, marginBottom: 8, marginLeft: 4 },
  rows: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.line, overflow: 'hidden' },
  row: {
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLine: { borderTopWidth: 1, borderTopColor: C.line },
  rowText: { fontFamily: F.regular, fontSize: 15, color: C.ink },
  rowSub: { fontFamily: F.regular, fontSize: 13, color: C.ink3 },
  rowValue: { fontFamily: F.regular, fontSize: 15, color: C.ink3 },
  tick: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: C.line2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickOn: { backgroundColor: C.ink, borderColor: C.ink },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.line2,
    backgroundColor: C.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnMain: { flex: 0, paddingHorizontal: 20, backgroundColor: C.ink, borderColor: C.ink },
  btnText: { fontFamily: F.medium, fontSize: 15, color: C.ink },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
