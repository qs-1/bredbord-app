// Settings: the account (sign in, or the person's name and picture), the settings, and about
// Bredbord. Delete account sits last. Reached from the person's own page, or from Home when signed out.
import { useState } from 'react';
import { alert, note } from '../dialog';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../Px';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { expo } from '../../app.json';
import {
  changeName,
  typingName,
  deleteAccount,
  nameProblem,
  PICTURES,
  setPicture,
  signOut,
  useAccount,
} from '../account';
import { forgetAccount } from '../circuits';
import { setSetting, useSettings } from '../settings';
import { C, F } from '../theme';
import { BottomSheet, Button, Group, IconButton, Person, Row, SheetHead, Tick } from '../ui';
import { SignInSheet } from '../SignIn';

export const LINKS = {
  website: 'https://bredbord.vercel.app/',
  source: 'https://github.com/qs-1/bredbord',
  issues: 'https://github.com/qs-1/bredbord/issues',
};

export function You({ navigation }: NativeStackScreenProps<Screens, 'You'>) {
  const insets = useSafeAreaInsets();
  const set = useSettings();
  const [signIn, setSignIn] = useState(false);
  const account = useAccount();
  const me = account.profile;
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);

  const saveName = async (): Promise<void> => {
    const bad = nameProblem(name);
    if (bad) return setProblem(bad);
    try {
      await changeName(name);
      setRenaming(false);
    } catch (e) {
      setProblem(e instanceof Error ? e.message : 'That didn’t work');
    }
  };

  const remove = (): void =>
    alert('Delete your account?', 'All your circuits are removed, from this phone and online. This can’t be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setBusy(true);
          try {
            const uid = account.session?.user.id;
            await deleteAccount();
            if (uid) await forgetAccount(uid);
            navigation.popToTop();
            note('Your account was deleted');
          } catch (e) {
            alert('The account wasn’t deleted', e instanceof Error ? e.message : undefined);
          } finally {
            setBusy(false);
          }
        },
      },
    ]);

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <View style={s.top}>
        <IconButton icon="chevl" label="Back" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <Text style={s.big}>Settings</Text>

        {me ? (
          <Group>
            <View style={s.me}>
              <Person part={me.picture} size={56} />
              <Text style={s.accountTitle}>{me.username}</Text>
            </View>
            <Row
              label="Change name"
              chevron
              onPress={() => {
                setName(me.username);
                setProblem('');
                setRenaming(true);
              }}
            />
            <Row label="Change picture" chevron onPress={() => setPicking(true)} />
          </Group>
        ) : (
          <View style={s.account}>
            <Text style={s.accountTitle}>Not signed in</Text>
            <Button label="Sign in" main onPress={() => setSignIn(true)} style={{ alignSelf: 'stretch' }} />
          </View>
        )}

        <Group label="Settings">
          <Row
            first
            label="Graphics"
            value={set.graphics === 'high' ? 'High' : 'Low'}
            onPress={() => setSetting('graphics', set.graphics === 'high' ? 'low' : 'high')}
          />
          <Row
            label="Vibrate on snaps and taps"
            right={<Tick on={set.vibrate} />}
            onPress={() => setSetting('vibrate', !set.vibrate)}
          />
          <Row
            label="Keep the screen on while the power is on"
            right={<Tick on={set.keepAwake} />}
            onPress={() => setSetting('keepAwake', !set.keepAwake)}
          />
          <Row
            label="Magnifier while placing"
            right={<Tick on={set.magnifier} />}
            onPress={() => setSetting('magnifier', !set.magnifier)}
          />
          <Row
            label="Hide pin names"
            right={<Tick on={set.hidePinNames} />}
            onPress={() => setSetting('hidePinNames', !set.hidePinNames)}
          />
        </Group>

        <Group label="Bredbord">
          <Row first label="About Bredbord" chevron onPress={() => navigation.navigate('About')} />
          <Row label="Report a problem" chevron onPress={() => void Linking.openURL(LINKS.issues)} />
          <Row label="Version" value={expo.version} />
        </Group>

        {account.session && (
          <>
            <Group>
              <Row
                first
                label="Sign out"
                left={<Icon name="signout" color={C.ink2} />}
                onPress={() =>
                  alert('Sign out?', 'Your circuits stay in your account. Sign in again to get them back here.', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Sign out',
                      onPress: () =>
                        void signOut()
                          .then(() => {
                            // Back to the start, as after any sign-out.
                            navigation.popToTop();
                            note('Signed out');
                          })
                          .catch(() => note('That didn’t work. Try again')),
                    },
                  ])
                }
              />
            </Group>
            <Group>
              <Row first label="Delete account" bad onPress={remove} />
            </Group>
            <Text style={s.note}>Also removes all your circuits</Text>
            {busy && <ActivityIndicator color={C.ink2} />}
          </>
        )}
      </ScrollView>
      <SignInSheet open={signIn} title="Sign in" onClose={() => setSignIn(false)} />
      <BottomSheet open={picking} onClose={() => setPicking(false)}>
        <SheetHead
          left=""
          onLeft={() => setPicking(false)}
          title="Picture"
          right="Done"
          onRight={() => setPicking(false)}
        />
        <View style={s.pictures}>
          {PICTURES.map((p) => (
            <Pressable
              key={p}
              style={[s.pictureBox, me?.picture === p && s.pictureOn]}
              onPress={() =>
                void setPicture(p).catch((e: unknown) => note(e instanceof Error ? e.message : 'That didn’t work'))
              }
              accessibilityLabel={p}
            >
              <Person part={p} size={52} />
            </Pressable>
          ))}
        </View>
      </BottomSheet>
      <BottomSheet open={renaming} onClose={() => setRenaming(false)}>
        <SheetHead
          left="Cancel"
          onLeft={() => setRenaming(false)}
          title="Name"
          right="Save"
          onRight={() => void saveName()}
        />
        <TextInput
          style={s.input}
          value={name}
          onChangeText={(t) => setName(typingName(t))}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={20}
          autoFocus
        />
        {!!problem && <Text style={s.problem}>{problem}</Text>}
      </BottomSheet>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  top: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  big: { fontFamily: F.medium, fontSize: 28, color: C.ink, marginHorizontal: 20, marginTop: 4, marginBottom: 16 },
  account: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    gap: 14,
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
  },
  accountTitle: { fontFamily: F.medium, fontSize: 17, color: C.ink },
  me: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  note: { fontFamily: F.regular, fontSize: 13, color: C.ink3, marginHorizontal: 20, marginTop: -12, marginBottom: 16 },
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
  pictures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  pictureBox: { padding: 3, borderRadius: 32, borderWidth: 2, borderColor: 'transparent' },
  pictureOn: { borderColor: C.ink },
  problem: { fontFamily: F.regular, fontSize: 14, color: C.bad, marginHorizontal: 20, marginTop: 8 },
});
