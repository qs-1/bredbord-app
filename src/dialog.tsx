// The app's own question box and short notes, in its style, instead of Android's grey alert and the
// system toast. `ask` and `note` can be called from anywhere; DialogHost (once, at the root) shows them.
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { floor, onFloor } from './floor';
import { Overlay } from './overlay';
import { C, F } from './theme';
import { EASE } from './ui';

export interface Choice {
  label: string;
  /** 'main' is the dark button, 'bad' the red one (deleting), 'cancel' the plain one that just closes. */
  kind?: 'main' | 'bad' | 'cancel';
  onPress?: () => void;
}

interface Question {
  id: number;
  title: string;
  message?: string;
  choices: Choice[];
}

let question: Question | null = null;
let notice: { id: number; text: string } | null = null;
let nextId = 1;
const listeners = new Set<() => void>();
const changed = (): void => listeners.forEach((fn) => fn());

/** Asks something, with its choices as buttons; tapping outside or Back is the 'cancel' choice. */
export function ask(title: string, message: string | undefined, choices: Choice[]): void {
  question = { id: nextId++, title, message, choices };
  changed();
}

/** A short note at the bottom of the screen, gone after a moment. */
export function note(text: string): void {
  notice = { id: nextId++, text };
  changed();
}

export function DialogHost() {
  const [, redraw] = useState(0);
  useEffect(() => {
    const fn = (): void => redraw((n) => n + 1);
    listeners.add(fn);
    return () => void listeners.delete(fn);
  }, []);
  return (
    <>
      {question && <QuestionBox key={question.id} q={question} />}
      {notice && <Notice key={notice.id} text={notice.text} />}
    </>
  );
}

function QuestionBox({ q }: { q: Question }) {
  const a = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(true);
  useEffect(() => {
    Animated.timing(a, {
      toValue: open ? 1 : 0,
      duration: open ? 220 : 150,
      easing: EASE,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !open && question?.id === q.id) {
        question = null;
        changed();
      }
    });
  }, [open, a, q.id]);
  const close = (then?: () => void): void => {
    if (!open) return;
    setOpen(false);
    then?.();
  };
  const cancel = q.choices.find((c) => c.kind === 'cancel');
  // Two choices sit side by side; more stack, the plain one last.
  const side = q.choices.length <= 2;
  const ordered = side ? q.choices : [...q.choices.filter((c) => c !== cancel), ...(cancel ? [cancel] : [])];
  return (
    <Overlay onBack={() => close(cancel?.onPress)}>
      <View style={s.fill} pointerEvents={open ? 'auto' : 'none'}>
        <Animated.View style={[s.fill, s.dim, { opacity: a }]}>
          <Pressable style={{ flex: 1 }} onPress={() => close(cancel?.onPress)} />
        </Animated.View>
        <View style={s.center} pointerEvents="box-none">
          <Animated.View
            style={[
              s.box,
              {
                opacity: a,
                transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }],
              },
            ]}
          >
            <Text style={s.title}>{q.title}</Text>
            {!!q.message && <Text style={s.message}>{q.message}</Text>}
            <View style={[s.choices, side && { flexDirection: 'row' }]}>
              {ordered.map((c) => (
                <Pressable
                  key={c.label}
                  style={[s.choice, side && { flex: 1 }, c.kind === 'main' && s.main, c.kind === 'bad' && s.bad]}
                  android_ripple={{ color: c.kind === 'main' || c.kind === 'bad' ? '#3a3733' : C.press }}
                  onPress={() => close(c.onPress)}
                >
                  <Text
                    style={[s.choiceText, (c.kind === 'main' || c.kind === 'bad') && { color: '#fff' }]}
                    numberOfLines={1}
                  >
                    {c.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </View>
      </View>
    </Overlay>
  );
}

function Notice({ text }: { text: string }) {
  const insets = useSafeAreaInsets();
  // Above any open sheet, so it doesn't cover the sheet's buttons.
  const [above, setAbove] = useState(floor);
  useEffect(() => onFloor(() => setAbove(floor())), []);
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.sequence([
      Animated.timing(a, { toValue: 1, duration: 200, easing: EASE, useNativeDriver: true }),
      Animated.delay(Math.min(4000, 1600 + text.length * 30)),
      Animated.timing(a, { toValue: 0, duration: 200, easing: EASE, useNativeDriver: true }),
    ]);
    anim.start(({ finished }) => {
      if (finished && notice?.text === text) {
        notice = null;
        changed();
      }
    });
    return () => anim.stop();
  }, [a, text]);
  return (
    <Overlay>
      <View style={[s.noteWrap, { bottom: Math.max(insets.bottom + 96, above + 12) }]} pointerEvents="none">
        <Animated.View
          style={[
            s.note,
            {
              opacity: a,
              transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
            },
          ]}
        >
          <Text style={s.noteText}>{text}</Text>
        </Animated.View>
      </View>
    </Overlay>
  );
}

const s = StyleSheet.create({
  fill: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
  dim: { backgroundColor: 'rgba(31,29,26,0.38)' },
  center: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  box: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: C.bar,
    borderRadius: 16,
    padding: 20,
    paddingBottom: 16,
    elevation: 24,
  },
  title: { fontFamily: F.medium, fontSize: 18, lineHeight: 23, color: C.ink },
  message: { fontFamily: F.regular, fontSize: 15, lineHeight: 21, color: C.ink2, marginTop: 8 },
  choices: { gap: 8, marginTop: 20 },
  choice: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.line2,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  main: { backgroundColor: C.ink, borderColor: C.ink },
  bad: { backgroundColor: C.bad, borderColor: C.bad },
  choiceText: { fontFamily: F.medium, fontSize: 15, color: C.ink },
  noteWrap: { position: 'absolute', left: 16, right: 16, alignItems: 'center' },
  note: {
    backgroundColor: C.ink,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
    maxWidth: 420,
  },
  noteText: { fontFamily: F.regular, fontSize: 14, lineHeight: 19, color: '#fff' },
});

/** Android's Alert.alert, drawn as the app's own box: same arguments, so call sites read as before. */
export function alert(
  title: string,
  message?: string,
  buttons: { text: string; style?: 'cancel' | 'destructive' | 'default'; onPress?: () => void }[] = [{ text: 'OK' }],
): void {
  const plain = buttons.filter((b) => b.style !== 'cancel' && b.style !== 'destructive');
  ask(
    title,
    message,
    buttons.map((b) => ({
      label: b.text,
      onPress: b.onPress,
      kind:
        b.style === 'cancel' ? 'cancel' : b.style === 'destructive' ? 'bad' : plain.length === 1 ? 'main' : undefined,
    })),
  );
}
