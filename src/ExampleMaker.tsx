// Makes the examples' pictures and documents once, out of sight: a desk of its own opens each example,
// says what it holds, and takes its picture. Shown nowhere; it goes away when it's done.
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { useAssets } from 'expo-asset';
import { missingExamples, saveExample } from './examples';

export function ExampleMaker() {
  const [todo, setTodo] = useState<number[] | null>(null);
  const [assets] = useAssets([require('../assets/desk.html')]);
  const web = useRef<WebView<object>>(null);
  const doc = useRef<unknown>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    void missingExamples().then(setTodo);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const send = (message: object): void =>
    web.current?.injectJavaScript(`window.bredbord&&window.bredbord.send(${JSON.stringify(message)});true;`) ??
    undefined;

  const onMessage = (e: WebViewMessageEvent): void => {
    if (!todo?.length) return;
    let m: { type: string; doc?: unknown; jpeg?: string };
    try {
      m = JSON.parse(e.nativeEvent.data);
    } catch {
      return;
    }
    if (m.type === 'ready') send({ type: 'example', index: todo[0] });
    else if (m.type === 'loaded') {
      doc.current = m.doc;
      // A moment for the view to draw before its picture is taken.
      timer.current = setTimeout(() => send({ type: 'picture' }), 800);
    } else if (m.type === 'picture' && m.jpeg) {
      const [done, ...rest] = todo;
      void saveExample(done, doc.current, m.jpeg).then(() => {
        setTodo(rest);
        if (rest.length) send({ type: 'example', index: rest[0] });
      });
    }
  };

  const uri = assets?.[0]?.localUri;
  if (!uri || !todo?.length) return null;
  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', left: 0, bottom: 0, width: 480, height: 360, opacity: 0 }}
    >
      <WebView<object>
        ref={web}
        source={{ uri }}
        originWhitelist={['*']}
        allowFileAccess
        allowFileAccessFromFileURLs
        javaScriptEnabled
        onMessage={onMessage}
      />
    </View>
  );
}
