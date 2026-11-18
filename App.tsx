// Bredbord for phones: native screens round the desk (the 3D view and simulator, which the workbench
// screen shows in a web view). See docs/APP-PLAN.md in the main project.
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AtkinsonHyperlegibleMono_400Regular } from '@expo-google-fonts/atkinson-hyperlegible-mono/400Regular';
import { AtkinsonHyperlegibleNext_400Regular } from '@expo-google-fonts/atkinson-hyperlegible-next/400Regular';
import { AtkinsonHyperlegibleNext_500Medium } from '@expo-google-fonts/atkinson-hyperlegible-next/500Medium';
import { DialogHost } from './src/dialog';
import { OverlayHost } from './src/overlay';
import { NameGate } from './src/SignIn';
// Keeps the account's circuits and the phone's in step from the start.
import './src/sync';
import { About } from './src/screens/About';
import { Circuit } from './src/screens/Circuit';
import { Edit } from './src/screens/Edit';
import { Home } from './src/screens/Home';
import { Profile } from './src/screens/Profile';
import { Workbench } from './src/screens/Workbench';
import { You } from './src/screens/You';
import { C } from './src/theme';

export type Screens = {
  Home: undefined;
  /**
   * A circuit from the list by its `id`, or a built-in `example` or a shared circuit (`remote`, its
   * id online) to look at: kept (as a remix) once it's changed, or at once with `keep`. A `fresh` one
   * is new and empty, and kept once something is put on it.
   */
  Workbench: { id?: string; name: string; example?: number; remote?: string; keep?: boolean; fresh?: boolean };
  /**
   * A circuit's page: one of the user's by `id`, a built-in `example`, or a shared one by its `remote`
   * id or a link's `code`.
   */
  Circuit: { id?: string; example?: number; remote?: string; code?: string };
  Edit: { id: string };
  You: undefined;
  About: undefined;
  Profile: { username: string };
};

const Stack = createNativeStackNavigator<Screens>();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: C.bar } };

export default function App() {
  const [ready] = useFonts({
    AtkinsonHyperlegibleNext_400Regular,
    AtkinsonHyperlegibleNext_500Medium,
    AtkinsonHyperlegibleMono_400Regular,
  });
  if (!ready) return <View style={{ flex: 1, backgroundColor: C.bar }} />;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Workbench" component={Workbench} />
            <Stack.Screen name="Circuit" component={Circuit} />
            <Stack.Screen name="Edit" component={Edit} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="You" component={You} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
          <NameGate />
          <DialogHost />
          <OverlayHost />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
