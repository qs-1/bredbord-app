// Edit one of the user's circuits: title, description and tags (who can open it is Share). Comes up from the
// bottom like a sheet; Save at the top right, Cancel asks first if something changed.
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { alert } from '../dialog';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Screens } from '../../App';
import { getCircuit, updateCircuit, type CircuitInfo } from '../circuits';
import { autoTags } from '../parts';
import { Icon } from '../Px';
import { C, F, R } from '../theme';
import { Chip, SheetHead } from '../ui';

const same = (a: string[], b: string[]): boolean => a.length === b.length && a.every((t, i) => t === b[i]);

export function Edit({ navigation, route }: NativeStackScreenProps<Screens, 'Edit'>) {
  const insets = useSafeAreaInsets();
  const [info, setInfo] = useState<CircuitInfo | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [adding, setAdding] = useState<string | null>(null);
  const tagInput = useRef<ComponentRef<typeof TextInput>>(null);

  useEffect(() => {
    void getCircuit(route.params.id).then((c) => {
      if (!c) return navigation.goBack();
      setInfo(c);
      setName(c.name);
      setDescription(c.description);
      setTags(c.tags ?? autoTags(c.parts));
    });
  }, [route.params.id, navigation]);

  const auto = info ? autoTags(info.parts) : [];
  const startTags = info ? (info.tags ?? auto) : [];
  const changed = !!info && (name !== info.name || description !== info.description || !same(tags, startTags));

  const cancel = (): void => {
    if (!changed) return navigation.goBack();
    alert('Discard your changes?', undefined, [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      cancel();
      return true;
    });
    return () => sub.remove();
  });

  const save = async (): Promise<void> => {
    if (!info) return;
    const title = name.trim() || info.name;
    // Tags left as worked out stay "worked out", so they follow the parts as the circuit changes.
    await updateCircuit(info.id, {
      name: title,
      description: description.trim(),
      tags: same(tags, auto) ? null : tags,
    });
    navigation.goBack();
  };

  const addTag = (): void => {
    const t = (adding ?? '').trim().replace(/\s+/g, ' ').slice(0, 24);
    if (t && !tags.some((x) => x.toLowerCase() === t.toLowerCase())) setTags([...tags, t]);
    setAdding(null);
  };

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <SheetHead left="Cancel" onLeft={cancel} title="Edit" right="Save" onRight={() => void save()} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <Text style={s.label}>Title</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} maxLength={60} returnKeyType="done" />

        <Text style={s.label}>Description</Text>
        <TextInput
          style={[s.input, s.area]}
          value={description}
          onChangeText={setDescription}
          multiline
          maxLength={500}
          textAlignVertical="top"
        />

        <Text style={s.label}>Tags</Text>
        <View style={s.tags}>
          {tags.map((t) => (
            <Chip
              key={t}
              label={t}
              onPress={() => setTags(tags.filter((x) => x !== t))}
              right={<Icon name="close" color={C.ink3} size={1.5} />}
            />
          ))}
          {adding === null ? (
            <Pressable
              style={[s.addTag]}
              onPress={() => {
                setAdding('');
                setTimeout(() => tagInput.current?.focus(), 50);
              }}
            >
              <Icon name="plus" color={C.ink3} size={1.5} />
              <Text style={s.addText}>Add tag</Text>
            </Pressable>
          ) : (
            <TextInput
              ref={tagInput}
              style={s.tagInput}
              value={adding}
              onChangeText={setAdding}
              onSubmitEditing={addTag}
              onBlur={addTag}
              returnKeyType="done"
              autoCapitalize="words"
              maxLength={24}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bar },
  label: { fontFamily: F.medium, fontSize: 13, color: C.ink3, marginHorizontal: 20, marginTop: 14, marginBottom: 6 },
  input: {
    marginHorizontal: 16,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line2,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: F.regular,
    fontSize: 15,
    color: C.ink,
  },
  area: { minHeight: 100 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: 16 },
  addTag: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: R.control,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: C.line2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addText: { fontFamily: F.regular, fontSize: 14, color: C.ink3 },
  tagInput: {
    height: 32,
    minWidth: 110,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: R.control,
    borderWidth: 1,
    borderColor: C.ink,
    backgroundColor: C.card,
    fontFamily: F.regular,
    fontSize: 14,
    color: C.ink,
  },
});
