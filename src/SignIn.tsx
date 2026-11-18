// The sign-in sheet, shown at the moment something needs an account (sharing, a like, a report):
// Google (Android's account picker), then, the first time, a name. NameGate asks for the name when
// someone is signed in without one and no sheet is showing (the app closed before they picked one).
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { canSignIn, typingName, createProfile, nameProblem, signInWithGoogle, useAccount } from './account';
import { C, F } from './theme';
import { BottomSheet, Button } from './ui';

type Step = 'choose' | 'name';

/** How many sign-in sheets are showing, so NameGate doesn't add a second one. */
let showing = 0;

export function SignInSheet({
  open,
  title,
  onClose,
  onDone,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  /** Called once signed in with a name. */
  onDone?: () => void;
}) {
  const account = useAccount();
  const [step, setStep] = useState<Step>('choose');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');

  useEffect(() => {
    if (!open) return;
    showing++;
    return () => void showing--;
  }, [open]);

  // Signed in already but no name yet: straight to the name.
  useEffect(() => {
    if (!open) return;
    setProblem('');
    setStep(account.session && !account.profile ? 'name' : 'choose');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Finished: signed in with a name.
  useEffect(() => {
    if (open && account.session && account.profile) {
      onClose();
      onDone?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, account.session, account.profile]);

  // Signed in, but no name yet.
  useEffect(() => {
    if (open && account.session && !account.profile && account.ready) setStep('name');
  }, [open, account.session, account.profile, account.ready]);

  const run = async (work: () => Promise<unknown>): Promise<void> => {
    setBusy(true);
    setProblem('');
    try {
      await work();
    } catch (e) {
      setProblem(e instanceof Error ? e.message : 'That didn’t work. Try again');
    } finally {
      setBusy(false);
    }
  };

  const heading = step === 'name' ? 'Pick a name' : title;

  return (
    <BottomSheet open={open} onClose={onClose}>
      <View style={s.box}>
        <Text style={s.title}>{heading}</Text>

        {!canSignIn && <Text style={s.problem}>Signing in isn’t set up in this build</Text>}

        {step === 'choose' && canSignIn && (
          <Button label="Continue with Google" main style={s.full} onPress={() => void run(signInWithGoogle)} />
        )}

        {step === 'name' && (
          <>
            <TextInput
              style={s.input}
              value={name}
              onChangeText={(t) => setName(typingName(t))}
              placeholder="your name"
              placeholderTextColor={C.ink3}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              autoFocus
            />
            <Button
              label="Done"
              main
              style={s.full}
              onPress={() => {
                const bad = nameProblem(name);
                if (bad) return setProblem(bad);
                void run(() => createProfile(name));
              }}
            />
          </>
        )}

        {!!problem && <Text style={s.problem}>{problem}</Text>}
        {/* The spinner takes the bottom line's place, so nothing above it moves while it waits. */}
        {busy ? (
          <View style={s.plain}>
            <ActivityIndicator color={C.ink2} />
          </View>
        ) : step === 'choose' ? (
          <Pressable style={s.plain} onPress={onClose}>
            <Text style={s.plainText}>Not now</Text>
          </Pressable>
        ) : (
          <View style={s.plain} />
        )}
      </View>
    </BottomSheet>
  );
}

const s = StyleSheet.create({
  box: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  title: { fontFamily: F.medium, fontSize: 17, color: C.ink, marginBottom: 8 },
  full: { flex: 0 },
  input: {
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
  problem: { fontFamily: F.regular, fontSize: 14, color: C.bad },
  plain: { height: 44, alignItems: 'center', justifyContent: 'center' },
  plainText: { fontFamily: F.regular, fontSize: 15, color: C.ink2 },
});

/**
 * Asks for a name when someone is signed in without one and no sign-in sheet is showing (the app was
 * closed after signing in, before a name was picked).
 */
export function NameGate() {
  const account = useAccount();
  const [dismissed, setDismissed] = useState(false);
  const needed = account.ready && !!account.session && !account.profile;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!needed) {
      setOpen(false);
      setDismissed(false);
    } else if (!dismissed && showing === 0) setOpen(true);
  }, [needed, dismissed]);
  return (
    <SignInSheet
      open={open}
      title="Pick a name"
      onClose={() => {
        setOpen(false);
        setDismissed(true);
      }}
    />
  );
}
