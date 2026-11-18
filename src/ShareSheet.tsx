// Share: who can open one of the user's circuits, picked in one place, with Copy link. Opened from the
// circuit's page, its long-press menu and the desk's top bar.
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Clipboard from 'expo-clipboard';
import { getAccount, useAccount } from './account';
import { getCircuit, onCircuitsChange, type CircuitInfo, type Visibility } from './circuits';
import { setOnline } from './community';
import { note } from './dialog';
import { Icon, type IconName } from './Px';
import { SignInSheet } from './SignIn';
import { linkFor } from './supabase';
import { C, F } from './theme';
import { BottomSheet, Button, Row, SheetHead } from './ui';

export const VISIBILITY: Record<Visibility, { label: string; sub: string; icon: IconName }> = {
  me: { label: 'Only me', sub: 'Nobody else can open it', icon: 'lock' },
  link: { label: 'Anyone with the link', sub: 'Not in Community', icon: 'link' },
  public: { label: 'Public', sub: 'In Community, for everyone', icon: 'globe' },
};

export function ShareSheet({ id, open, onClose }: { id: string | null; open: boolean; onClose: () => void }) {
  const account = useAccount();
  const [info, setInfo] = useState<CircuitInfo | null>(null);
  const [busy, setBusy] = useState<Visibility | null>(null);
  const [signIn, setSignIn] = useState<Visibility | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  useEffect(() => {
    if (!open || !id) return;
    const read = (): void => void getCircuit(id).then(setInfo);
    read();
    return onCircuitsChange(read);
  }, [open, id]);

  const pick = async (v: Visibility): Promise<void> => {
    if (!id || !info || busy || v === info.visibility) return;
    if (v !== 'me' && !getAccount().profile) return setSignIn(v);
    setBusy(v);
    try {
      // The tick moving is the answer; no message over the sheet.
      await setOnline(id, v);
    } catch (e) {
      note(e instanceof Error ? e.message : 'That didn’t work. Try again');
    } finally {
      setBusy(null);
    }
  };

  const copy = async (): Promise<void> => {
    if (!info?.remote) return;
    await Clipboard.setStringAsync(linkFor(info.remote.code));
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  const shared = !!info && info.visibility !== 'me';
  return (
    <>
      <BottomSheet open={open} onClose={onClose}>
        <SheetHead left="" onLeft={onClose} title="Share" right="Done" onRight={onClose} />
        <Text style={s.label}>Who can open it</Text>
        <View style={s.rows}>
          {(Object.keys(VISIBILITY) as Visibility[]).map((v, i) => (
            <Row
              key={v}
              first={i === 0}
              label={VISIBILITY[v].label}
              sub={VISIBILITY[v].sub}
              left={<Icon name={VISIBILITY[v].icon} color={C.ink2} />}
              right={
                busy === v ? (
                  <ActivityIndicator color={C.ink2} />
                ) : info?.visibility === v ? (
                  <Icon name="check" color={C.ink} />
                ) : undefined
              }
              onPress={() => void pick(v)}
            />
          ))}
        </View>
        {/* The same room whether or not there's a link, so the sheet doesn't jump when one is picked. */}
        <View style={s.slot}>
          {shared ? (
            <Animated.View key="copy" entering={FadeIn.duration(160)} exiting={FadeOut.duration(120)}>
              <Button
                label={copied ? 'Link copied' : info.remote ? 'Copy link' : 'Link comes once it’s online'}
                icon={copied ? 'check' : 'link'}
                main={!!info.remote}
                onPress={() => void copy()}
                style={s.copy}
              />
            </Animated.View>
          ) : (
            <Animated.Text key="none" entering={FadeIn.duration(160)} exiting={FadeOut.duration(120)} style={s.none}>
              {account.profile
                ? 'Pick who can open it to get a link'
                : 'Sharing needs an account. Your circuits stay yours.'}
            </Animated.Text>
          )}
        </View>
      </BottomSheet>
      <SignInSheet
        open={!!signIn}
        title="Sign in to share"
        onClose={() => setSignIn(null)}
        onDone={() => signIn && void pick(signIn)}
      />
    </>
  );
}

const s = StyleSheet.create({
  label: { fontFamily: F.medium, fontSize: 13, color: C.ink3, marginHorizontal: 20, marginTop: 4, marginBottom: 8 },
  rows: {
    marginHorizontal: 16,
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    overflow: 'hidden',
  },
  slot: { height: 48, marginHorizontal: 16, marginTop: 14, justifyContent: 'center' },
  copy: { flex: 0 },
  none: { fontFamily: F.regular, fontSize: 13, color: C.ink3, textAlign: 'center' },
});
