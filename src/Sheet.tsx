// A bottom sheet that behaves as Android's do: it follows the finger exactly, carries on with the
// speed of a flick, and settles at one of its stops (shut, part open, fully open). It slides as one
// piece on the phone's graphics side, so nothing is laid out again while it moves.
import { forwardRef, useImperativeHandle, useState, type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { C, R } from './theme';

export interface SheetHandle {
  /** Slides to stop `index` (0 is shut). */
  go(index: number): void;
}

const SPRING = { damping: 34, stiffness: 340, mass: 1, overshootClamping: false } as const;

export const Sheet = forwardRef<
  SheetHandle,
  {
    /** How much of the sheet shows at each stop, in screen units, smallest first. 0 for shut. */
    stops: readonly number[];
    /** Space kept clear under the sheet (the tool bar), so it rises from above that. */
    bottom: number;
    /** Called with the stop the sheet has settled at. */
    onSettle?: (index: number) => void;
    /** The part that's dragged: a handle bar is drawn above it. */
    header?: ReactNode;
    children?: ReactNode;
  }
>(function Sheet({ stops, bottom, onSettle, header, children }, ref) {
  const { height: screen } = useWindowDimensions();
  const tallest = stops[stops.length - 1];
  /** How much shows now. */
  const shown = useSharedValue(0);
  const from = useSharedValue(0);

  // The stop it's at (or going to) and the header's height: what's under the header fits what shows,
  // so a list in it scrolls to its end at every stop, not only the tallest.
  const [at, setAt] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const settle = (index: number): void => {
    setAt(index);
    onSettle?.(index);
  };

  useImperativeHandle(ref, () => ({
    go(index: number) {
      shown.value = withSpring(stops[index] ?? 0, SPRING);
      settle(index);
    },
  }));

  const pan = usePanGesture({
    onBegin: () => {
      'worklet';
      from.value = shown.value;
    },
    onUpdate: (e) => {
      'worklet';
      // Past the top stop it gives a little, then holds.
      const want = from.value - e.translationY;
      shown.value = want > tallest ? tallest + (want - tallest) * 0.15 : Math.max(0, want);
    },
    onDeactivate: (e) => {
      'worklet';
      // Where a flick at this speed would carry it; the nearest stop to that is where it settles.
      const landing = shown.value - e.velocityY * 0.18;
      let best = 0;
      for (let i = 1; i < stops.length; i++) {
        if (Math.abs(stops[i] - landing) < Math.abs(stops[best] - landing)) best = i;
      }
      shown.value = withSpring(stops[best], { ...SPRING, velocity: -e.velocityY });
      scheduleOnRN(settle, best);
    },
  });

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: tallest - shown.value }] }));

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[s.sheet, { height: tallest + screen, bottom: bottom - screen }, style]}
    >
      <GestureDetector gesture={pan}>
        <View onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
          <View style={s.grip}>
            <View style={s.bar} />
          </View>
          {header}
        </View>
      </GestureDetector>
      <View style={{ maxHeight: Math.max(0, (stops[at] || tallest) - headerHeight) }}>{children}</View>
    </Animated.View>
  );
});

const s = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: C.card,
    borderTopLeftRadius: R.sheet,
    borderTopRightRadius: R.sheet,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: C.line,
    elevation: 12,
  },
  grip: { height: 22, alignItems: 'center', justifyContent: 'center' },
  bar: { width: 36, height: 4, borderRadius: 2, backgroundColor: C.line2 },
});
