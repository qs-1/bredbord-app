# How the app works

React Native with Expo, TypeScript, Android only for now. The screens are native; the 3D desk and
the simulator are the website's own code, running in a WebView.

```
App.tsx            navigation, and the hosts for sheets and dialogs
src/screens/       one file per screen
src/               everything the screens share (below)
src/generated/     copied from the website by its build script; not edited here
assets/desk.html   the website's desk, built into one file
```

## The desk

`assets/desk.html` is the website's `embed/index.html`, built by `npm run build:desk` in the
website's repo into a single file with its script, styles and fonts inside it, because a page
opened from the app's storage can't load other files. The same script writes `src/generated/`: the
pixel icons (`px.ts`), the parts and their pictures (`parts.ts`) and the parts list with its
sections (`catalogue.ts`). To refresh them, check this repo out as `mobile/` inside the website's
repo and run that script there.

`screens/Workbench.tsx` shows the desk and draws everything around it: the top bar, the tools, the
parts sheet, the selection card. The two talk in messages, typed in the website's `src/embed.ts`.
The app sends a document to load, a tool, a wire colour, power on or off. The desk sends its state
(what's selected, the tool, undo and redo), the document after each change, and problems with the
circuit, which show at the top of the desk.

`ExampleMaker.tsx` opens a hidden desk once, on first run, to make the built-in examples' pictures
and part lists (`examples.ts`).

## Circuits on the phone

`circuits.ts` keeps them in AsyncStorage: one small list (names, parts, times) read to draw the home
screen, and each circuit's document and picture under keys of their own, read only when needed.

Each circuit belongs to an account, or to the phone when it was made signed out. My circuits shows
the signed-in account's, or the phone's own when signed out; the rest stay stored, out of sight.
Signing in moves the phone's own circuits into that account.

## Accounts and sharing

The backend is Supabase. Its tables and rules live in the website's repo (`supabase/`); this app holds
only the publishable key, and the database decides what anyone may read or write.

- `supabase.ts`: the client, the row types, links and picture addresses.
- `account.ts`: sign-in with Google only, through Android's own account picker
  (`@react-native-google-signin/google-signin`). Google hands back an ID token and Supabase trades it
  for a session (`signInWithIdToken`), so no Supabase address is ever shown. The native module is
  loaded only when signing in, so a build without it, or without `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`,
  runs signed out instead of crashing. Also the person's name and picture, signing out (which also
  forgets the Google account picked) and deleting the account.
- `sync.ts`: keeps a signed-in account's circuits in step with the phone. A change goes up six
  seconds after the last edit, or at once when leaving the desk. The account's copies come down on
  sign-in, when the app comes back to the front, and on pull to refresh. Each circuit counts its
  changes (`rev`), so an upload that raced an edit leaves it marked changed. Deletions made offline
  are remembered and sent later. The newest edit wins.
- `community.ts`: who can open a circuit (only me, anyone with the link, public), the Community
  feed, likes, reports, remixes and people's pages.

## UI pieces

- `ui.tsx`: buttons, rows, chips, cards, the bottom sheet and the long-press menu.
- `overlay.tsx`: sheets and menus draw over the app here instead of in a `Modal`. On Android a
  Modal is a separate window: it shows a frame late, so its animations jump, and it isn't told the
  keyboard's height.
- `Sheet.tsx`: the desk's parts sheet, which follows the finger and settles at its stops.
- `dialog.tsx`: confirmations and short notes in the app's own style, in place of Android's alerts.
- `ShareSheet.tsx`, `SignIn.tsx`, `menus.ts`: share, sign-in, and what each card's long-press
  menu offers.
- `theme.ts`, `Px.tsx`, `icons.ts`, `PartPicture.tsx`: colours, type, pixel icons, part pictures.
