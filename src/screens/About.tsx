// About Bredbord: what it is, where it lives, and the licences of what it's built with (their
// licences ask for this list to ship with the app).
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { expo } from '../../app.json';
import { Logo } from '../Px';
import { C, F } from '../theme';
import { Group, IconButton, Row } from '../ui';
import { LINKS } from './You';

const LICENCES: [string, string][] = [
  ['Atkinson Hyperlegible Next and Mono', 'SIL Open Font License 1.1'],
  ['React Native', 'MIT'],
  ['Expo', 'MIT'],
  ['React Navigation', 'MIT'],
  ['three.js', 'MIT'],
];

export function About({ navigation }: NativeStackScreenProps<Screens, 'About'>) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <View style={s.top}>
        <IconButton icon="chevl" label="Back" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <View style={s.head}>
          <Logo size={3} />
          <Text style={s.text}>
            An open-source breadboard and circuit simulator, on your phone and in your browser.
          </Text>
          <Text style={s.version}>Version {expo.version}</Text>
        </View>
        <Group>
          <Row first label="Website" chevron onPress={() => void Linking.openURL(LINKS.website)} />
          <Row label="Source code" chevron onPress={() => void Linking.openURL(LINKS.source)} />
        </Group>
        <Group label="Licences">
          {LICENCES.map(([name, licence], i) => (
            <Row key={name} first={i === 0} label={name} sub={licence} />
          ))}
        </Group>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  top: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  head: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 14 },
  text: { fontFamily: F.regular, fontSize: 15, lineHeight: 21, color: C.ink2 },
  version: { fontFamily: F.regular, fontSize: 13, color: C.ink3 },
});
