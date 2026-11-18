// Made by scripts/build-embed.mjs from src/ui/catalogue.ts (the website's parts panel). Don't edit.
export const SECTIONS = ["Boards and power","Instruments","Basics","Switches and displays","Logic chips","Memory and CPU"] as const;

export interface Tile {
  id: string;
  name: string;
  sub: string;
  section: (typeof SECTIONS)[number];
  keywords: string;
  send: { type: string; [key: string]: string };
  svg: string;
}

export const CATALOGUE: Tile[] = [
  {
    "id": "bb",
    "name": "Breadboard",
    "sub": "830 holes",
    "section": "Boards and power",
    "keywords": "bb830 full",
    "send": {
      "type": "board",
      "board": "bb830"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"2\" y=\"7\" width=\"60\" height=\"34\" rx=\"2\" fill=\"#f8f6f0\" stroke=\"#d4cfc3\" stroke-width=\".8\"/><rect x=\"3.5\" y=\"23.4\" width=\"57\" height=\"1.4\" fill=\"#ebe7dc\"/><rect x=\"4.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><line x1=\"4.5\" x2=\"59.5\" y1=\"9.4\" y2=\"9.4\" stroke=\"#e2362a\" stroke-width=\".8\"/><line x1=\"4.5\" x2=\"59.5\" y1=\"15\" y2=\"15\" stroke=\"#2a62d8\" stroke-width=\".8\"/><line x1=\"4.5\" x2=\"59.5\" y1=\"33\" y2=\"33\" stroke=\"#2a62d8\" stroke-width=\".8\"/><line x1=\"4.5\" x2=\"59.5\" y1=\"38.6\" y2=\"38.6\" stroke=\"#e2362a\" stroke-width=\".8\"/><rect x=\"4.45\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/></svg>"
  },
  {
    "id": "bb-bare",
    "name": "Breadboard without rails",
    "sub": "630 holes",
    "section": "Boards and power",
    "keywords": "bb830 630 bare core no rails",
    "send": {
      "type": "board",
      "board": "core-bb830"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"2\" y=\"12\" width=\"60\" height=\"24\" rx=\"2\" fill=\"#f8f6f0\" stroke=\"#d4cfc3\" stroke-width=\".8\"/><rect x=\"3.5\" y=\"23\" width=\"57\" height=\"1.4\" fill=\"#ebe7dc\"/><rect x=\"4.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"4.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"6.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"8.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"11.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"13.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"48.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"50.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"52.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"55.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"57.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/></svg>"
  },
  {
    "id": "half",
    "name": "Half breadboard",
    "sub": "400 holes",
    "section": "Boards and power",
    "keywords": "bb400",
    "send": {
      "type": "board",
      "board": "bb400"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"13\" y=\"7\" width=\"38\" height=\"34\" rx=\"2\" fill=\"#f8f6f0\" stroke=\"#d4cfc3\" stroke-width=\".8\"/><rect x=\"14.5\" y=\"23.4\" width=\"35\" height=\"1.4\" fill=\"#ebe7dc\"/><rect x=\"15.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"17.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"19.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"21.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"25.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"27.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.65\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"29.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><line x1=\"15.5\" x2=\"48.5\" y1=\"9.4\" y2=\"9.4\" stroke=\"#e2362a\" stroke-width=\".8\"/><line x1=\"15.5\" x2=\"48.5\" y1=\"15\" y2=\"15\" stroke=\"#2a62d8\" stroke-width=\".8\"/><line x1=\"15.5\" x2=\"48.5\" y1=\"33\" y2=\"33\" stroke=\"#2a62d8\" stroke-width=\".8\"/><line x1=\"15.5\" x2=\"48.5\" y1=\"38.6\" y2=\"38.6\" stroke=\"#e2362a\" stroke-width=\".8\"/><rect x=\"15.45\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"10.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"12.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"34.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"15.45\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"17.65\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"22.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"24.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.65\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"33.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"35.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.45\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.85\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"44.05\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"46.25\" y=\"36.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/></svg>"
  },
  {
    "id": "mini",
    "name": "Mini breadboard",
    "sub": "170 holes",
    "section": "Boards and power",
    "keywords": "small",
    "send": {
      "type": "board",
      "board": "mini"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"17\" y=\"12\" width=\"30\" height=\"24\" rx=\"2\" fill=\"#f8f6f0\" stroke=\"#d4cfc3\" stroke-width=\".8\"/><rect x=\"18.5\" y=\"23\" width=\"27\" height=\"1.4\" fill=\"#ebe7dc\"/><rect x=\"19.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"21.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"32.65\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.85\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.05\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.25\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.45\" y=\"15.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"21.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"32.65\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.85\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.05\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.25\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.45\" y=\"17.65\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"21.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"32.65\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.85\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.05\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.25\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.45\" y=\"19.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"21.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"32.65\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.85\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.05\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.25\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.45\" y=\"27.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"21.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"32.65\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.85\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.05\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.25\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.45\" y=\"29.25\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"19.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"21.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"26.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"28.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"30.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"32.65\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.85\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"37.05\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"39.25\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"41.45\" y=\"31.45\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/></svg>"
  },
  {
    "id": "rail",
    "name": "Power rail",
    "sub": "+ and −",
    "section": "Boards and power",
    "keywords": "bus strip",
    "send": {
      "type": "board",
      "board": "strip-bb830-top"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"3\" y=\"17\" width=\"58\" height=\"14\" rx=\"2\" fill=\"#f8f6f0\" stroke=\"#d4cfc3\" stroke-width=\".8\"/><line x1=\"5.5\" x2=\"58.5\" y1=\"19.5\" y2=\"19.5\" stroke=\"#e2362a\" stroke-width=\".8\"/><line x1=\"5.5\" x2=\"58.5\" y1=\"28.5\" y2=\"28.5\" stroke=\"#2a62d8\" stroke-width=\".8\"/><rect x=\"5.45\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"5.45\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"7.65\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"7.65\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"9.85\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"9.85\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"12.05\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"12.05\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"14.25\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"14.25\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"18.65\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"18.65\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"20.85\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"20.85\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.05\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"23.05\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"25.25\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"25.25\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"27.45\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"27.45\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"31.85\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"31.85\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.05\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"34.05\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"36.25\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"36.25\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"38.45\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"38.45\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"40.65\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"40.65\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"45.05\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"45.05\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"47.25\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"47.25\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"49.45\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"49.45\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"51.65\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"51.65\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"53.85\" y=\"22.05\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/><rect x=\"53.85\" y=\"24.85\" width=\"1.1\" height=\"1.1\" fill=\"#5a5650\"/></svg>"
  },
  {
    "id": "power",
    "name": "Power module",
    "sub": "5 V or 3.3 V",
    "section": "Boards and power",
    "keywords": "usb mb102",
    "send": {
      "type": "place",
      "part": "power"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"9\" y=\"9\" width=\"46\" height=\"30\" rx=\"2\" fill=\"#c8302a\"/><rect x=\"11\" y=\"13\" width=\"12\" height=\"11\" rx=\"1\" fill=\"#1d1c1a\"/><circle cx=\"17\" cy=\"18.5\" r=\"2.4\" fill=\"#47443f\"/><rect x=\"11\" y=\"28\" width=\"8\" height=\"5\" rx=\".8\" fill=\"#c6c3bd\"/><rect x=\"26\" y=\"13\" width=\"7\" height=\"4\" rx=\".5\" fill=\"#2a2826\"/><rect x=\"27.5\" y=\"13.8\" width=\"2.5\" height=\"2.4\" fill=\"#ece9e3\"/><circle cx=\"31\" cy=\"30\" r=\"3.2\" fill=\"#2a2826\"/><rect x=\"43\" y=\"12\" width=\"4\" height=\"7\" rx=\".5\" fill=\"#f0c419\"/><rect x=\"43\" y=\"29\" width=\"4\" height=\"7\" rx=\".5\" fill=\"#f0c419\"/><rect x=\"49.90\" y=\"12.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"29.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"14.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"31.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"16.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"33.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"18.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"49.90\" y=\"35.40\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/></svg>"
  },
  {
    "id": "supply",
    "name": "Bench supply",
    "sub": "0 to 30 V",
    "section": "Boards and power",
    "keywords": "power psu",
    "send": {
      "type": "carry",
      "what": "supply"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"5\" y=\"9\" width=\"54\" height=\"31\" rx=\"3\" fill=\"#e7e5e0\" stroke=\"#c9c5bd\" stroke-width=\".8\"/><rect x=\"9\" y=\"13\" width=\"19\" height=\"8\" rx=\"1\" fill=\"#16201a\"/><text x=\"18.5\" y=\"19.3\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"6\" fill=\"#57e389\">5.00</text><rect x=\"9\" y=\"24\" width=\"19\" height=\"8\" rx=\"1\" fill=\"#16201a\"/><text x=\"18.5\" y=\"30.3\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"6\" fill=\"#ff8a5c\">0.12</text><circle cx=\"38\" cy=\"17\" r=\"4.2\" fill=\"#3b3935\"/><circle cx=\"50\" cy=\"17\" r=\"4.2\" fill=\"#3b3935\"/><circle cx=\"38\" cy=\"32\" r=\"2.6\" fill=\"#d8352b\"/><circle cx=\"50\" cy=\"32\" r=\"2.6\" fill=\"#1d1c1a\"/></svg>"
  },
  {
    "id": "probe",
    "name": "Probe",
    "sub": "Watch one hole",
    "section": "Instruments",
    "keywords": "logic analyser analyzer",
    "send": {
      "type": "probe"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><path d=\"M14 33c-6 2-9 7-6 11\" stroke=\"#262422\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/><g transform=\"rotate(-32 32 24)\"><rect x=\"12\" y=\"20\" width=\"30\" height=\"8\" rx=\"3\" fill=\"#2a2826\"/><rect x=\"34\" y=\"20\" width=\"4\" height=\"8\" fill=\"#e2362a\"/><rect x=\"42\" y=\"21.5\" width=\"6\" height=\"5\" rx=\"1\" fill=\"#47443f\"/><line x1=\"48\" y1=\"24\" x2=\"58\" y2=\"24\" stroke=\"#bab7b1\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><rect x=\"16\" y=\"22.5\" width=\"12\" height=\"3\" rx=\"1.5\" fill=\"#47443f\"/></g></svg>"
  },
  {
    "id": "meter",
    "name": "Multimeter",
    "sub": "Volts, ohms, amps",
    "section": "Instruments",
    "keywords": "voltmeter ammeter dmm continuity",
    "send": {
      "type": "carry",
      "what": "meter"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"18\" y=\"3\" width=\"28\" height=\"42\" rx=\"4\" fill=\"#f0c419\" stroke=\"#c99a12\" stroke-width=\".8\"/><rect x=\"21.5\" y=\"7\" width=\"21\" height=\"10\" rx=\"1\" fill=\"#cbd3c0\" stroke=\"#3b3935\" stroke-width=\".7\"/><text x=\"32\" y=\"14.6\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"6.5\" fill=\"#1d1c1a\">4.98</text><circle cx=\"32\" cy=\"28.5\" r=\"7.5\" fill=\"#2a2826\"/><line x1=\"32\" y1=\"28.5\" x2=\"36\" y2=\"23.5\" stroke=\"#ece9e3\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><circle cx=\"25\" cy=\"40.5\" r=\"1.8\" fill=\"#d8352b\"/><circle cx=\"32\" cy=\"40.5\" r=\"1.8\" fill=\"#1d1c1a\"/><circle cx=\"39\" cy=\"40.5\" r=\"1.8\" fill=\"#d8352b\"/></svg>"
  },
  {
    "id": "scope",
    "name": "Oscilloscope",
    "sub": "2 channels",
    "section": "Instruments",
    "keywords": "scope",
    "send": {
      "type": "carry",
      "what": "scope"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"3\" y=\"8\" width=\"58\" height=\"33\" rx=\"3\" fill=\"#dddad4\" stroke=\"#c3bfb7\" stroke-width=\".8\"/><rect x=\"7\" y=\"12\" width=\"32\" height=\"24\" rx=\"1\" fill=\"#121a20\"/><path d=\"M9 29h5v-10h7v10h7v-10h7v10h2\" stroke=\"#f0d33a\" stroke-width=\"1.2\" fill=\"none\"/><circle cx=\"46\" cy=\"17\" r=\"3\" fill=\"#3b3935\"/><circle cx=\"55\" cy=\"17\" r=\"3\" fill=\"#3b3935\"/><circle cx=\"46\" cy=\"27\" r=\"3\" fill=\"#3b3935\"/><circle cx=\"55\" cy=\"27\" r=\"3\" fill=\"#3b3935\"/><rect x=\"43\" y=\"33\" width=\"15\" height=\"3.5\" rx=\"1\" fill=\"#bab6af\"/></svg>"
  },
  {
    "id": "resistor",
    "name": "Resistor",
    "sub": "Any value",
    "section": "Basics",
    "keywords": "ohm",
    "send": {
      "type": "place",
      "part": "resistor"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"4\" y1=\"24\" x2=\"60\" y2=\"24\" stroke=\"#a5a29c\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><rect x=\"19\" y=\"18.5\" width=\"26\" height=\"11\" rx=\"5.5\" fill=\"#dcc39a\"/><rect x=\"24\" y=\"18.5\" width=\"2.6\" height=\"11\" fill=\"#e07b2a\"/><rect x=\"29\" y=\"18.5\" width=\"2.6\" height=\"11\" fill=\"#e07b2a\"/><rect x=\"34\" y=\"18.5\" width=\"2.6\" height=\"11\" fill=\"#7a4a1e\"/><rect x=\"39.5\" y=\"18.5\" width=\"2.6\" height=\"11\" fill=\"#c9a227\"/></svg>"
  },
  {
    "id": "led",
    "name": "LED",
    "sub": "3 or 5 mm",
    "section": "Basics",
    "keywords": "light diode",
    "send": {
      "type": "place",
      "part": "led-red"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"28.5\" y1=\"30\" x2=\"28.5\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"35.5\" y1=\"30\" x2=\"35.5\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><rect x=\"22.5\" y=\"28\" width=\"19\" height=\"3\" rx=\"1\" fill=\"#c42b21\"/><path d=\"M24 29V18a8 8 0 0 1 16 0v11z\" fill=\"#e2362a\"/><path d=\"M27 18a5 5 0 0 1 4-4.6\" stroke=\"#fff\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\" opacity=\".55\"/></svg>"
  },
  {
    "id": "cap-ceramic",
    "name": "Capacitor",
    "sub": "Ceramic",
    "section": "Basics",
    "keywords": "disc",
    "send": {
      "type": "place",
      "part": "cap-ceramic"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"29\" y1=\"24\" x2=\"29\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"35\" y1=\"24\" x2=\"35\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><ellipse cx=\"32\" cy=\"19\" rx=\"9.5\" ry=\"9\" fill=\"#e59a3c\"/><ellipse cx=\"29\" cy=\"16\" rx=\"3\" ry=\"2\" fill=\"#fff\" opacity=\".35\"/></svg>"
  },
  {
    "id": "cap-electrolytic",
    "name": "Capacitor",
    "sub": "Electrolytic",
    "section": "Basics",
    "keywords": "polarised polarized",
    "send": {
      "type": "place",
      "part": "cap-electrolytic"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"29\" y1=\"32\" x2=\"29\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"35\" y1=\"32\" x2=\"35\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><rect x=\"23\" y=\"5\" width=\"18\" height=\"28\" rx=\"3\" fill=\"#25305c\"/><rect x=\"34\" y=\"5\" width=\"4.5\" height=\"28\" fill=\"#a9b4d6\"/></svg>"
  },
  {
    "id": "1N4148",
    "name": "Diode",
    "sub": "1N4148, 1N4007",
    "section": "Basics",
    "keywords": "signal rectifier 1n4007",
    "send": {
      "type": "place",
      "part": "1N4148"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"4\" y1=\"24\" x2=\"60\" y2=\"24\" stroke=\"#a5a29c\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><rect x=\"21\" y=\"19.5\" width=\"22\" height=\"9\" rx=\"1.5\" fill=\"#1d1c1a\"/><rect x=\"36.5\" y=\"19.5\" width=\"3\" height=\"9\" fill=\"#c9c5bd\"/></svg>"
  },
  {
    "id": "2N3904",
    "name": "Transistor",
    "sub": "NPN",
    "section": "Basics",
    "keywords": "bjt 2n3904 2n2222",
    "send": {
      "type": "place",
      "part": "2N3904"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"26\" y1=\"30\" x2=\"26\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"32\" y1=\"30\" x2=\"32\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"38\" y1=\"30\" x2=\"38\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><path d=\"M22 13h20v11a10 7 0 0 1-20 0z\" fill=\"#262422\"/><text x=\"32\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#c2bfb9\">NPN</text></svg>"
  },
  {
    "id": "2N3906",
    "name": "Transistor",
    "sub": "PNP",
    "section": "Basics",
    "keywords": "bjt 2n3906",
    "send": {
      "type": "place",
      "part": "2N3906"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"26\" y1=\"30\" x2=\"26\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"32\" y1=\"30\" x2=\"32\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"38\" y1=\"30\" x2=\"38\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><path d=\"M22 13h20v11a10 7 0 0 1-20 0z\" fill=\"#262422\"/><text x=\"32\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#c2bfb9\">PNP</text></svg>"
  },
  {
    "id": "pot",
    "name": "Potentiometer",
    "sub": "Knob",
    "section": "Basics",
    "keywords": "variable resistor trimmer",
    "send": {
      "type": "place",
      "part": "pot"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"25\" y1=\"34\" x2=\"25\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"32\" y1=\"34\" x2=\"32\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"39\" y1=\"34\" x2=\"39\" y2=\"45\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><rect x=\"18\" y=\"9\" width=\"28\" height=\"26\" rx=\"2\" fill=\"#2f5fb3\"/><circle cx=\"32\" cy=\"22\" r=\"8\" fill=\"#f2f1ee\" stroke=\"#d2cec6\"/><line x1=\"32\" y1=\"22\" x2=\"32\" y2=\"15.5\" stroke=\"#5a5650\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></svg>"
  },
  {
    "id": "resistor-network",
    "name": "Resistor network",
    "sub": "8 resistors",
    "section": "Basics",
    "keywords": "sip array bussed",
    "send": {
      "type": "place",
      "part": "resistor-network"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"16\" y1=\"29\" x2=\"16\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"29\" x2=\"20\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"24\" y1=\"29\" x2=\"24\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"28\" y1=\"29\" x2=\"28\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"32\" y1=\"29\" x2=\"32\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"36\" y1=\"29\" x2=\"36\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"29\" x2=\"40\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"44\" y1=\"29\" x2=\"44\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"48\" y1=\"29\" x2=\"48\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><rect x=\"12.5\" y=\"15\" width=\"39\" height=\"16\" rx=\"4\" fill=\"#2a2826\"/><circle cx=\"17.5\" cy=\"23\" r=\"1.3\" fill=\"#e8e5df\"/><text x=\"34.5\" y=\"24.8\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.4\" fill=\"#d6d3cd\">A102J</text></svg>"
  },
  {
    "id": "button",
    "name": "Push button",
    "sub": "Press to close",
    "section": "Switches and displays",
    "keywords": "tactile momentary",
    "send": {
      "type": "place",
      "part": "button"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20\" y=\"12\" width=\"24\" height=\"24\" rx=\"2\" fill=\"#2a2826\"/><circle cx=\"32\" cy=\"24\" r=\"6.5\" fill=\"#151413\" stroke=\"#47443f\"/><line x1=\"21\" y1=\"36\" x2=\"21\" y2=\"44\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"43\" y1=\"36\" x2=\"43\" y2=\"44\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/></svg>"
  },
  {
    "id": "slide-switch",
    "name": "Slide switch",
    "sub": "On or off",
    "section": "Switches and displays",
    "keywords": "toggle spdt",
    "send": {
      "type": "place",
      "part": "slide-switch"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><line x1=\"25\" y1=\"29\" x2=\"25\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"32\" y1=\"29\" x2=\"32\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><line x1=\"39\" y1=\"29\" x2=\"39\" y2=\"42\" stroke=\"#a5a29c\" stroke-width=\"1.3\" stroke-linecap=\"round\"/><rect x=\"14\" y=\"16\" width=\"36\" height=\"14\" rx=\"2\" fill=\"#2a2826\"/><rect x=\"19\" y=\"19\" width=\"11\" height=\"8\" rx=\"1\" fill=\"#efede8\"/></svg>"
  },
  {
    "id": "push-switch",
    "name": "Push switch",
    "sub": "Push on, push off",
    "section": "Switches and displays",
    "keywords": "dpdt latching self-locking toggle",
    "send": {
      "type": "place",
      "part": "push-switch"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"18\" y=\"10\" width=\"28\" height=\"28\" rx=\"1.5\" fill=\"#2a2826\"/><rect x=\"20\" y=\"12\" width=\"24\" height=\"24\" rx=\"1\" fill=\"#efede8\"/><rect x=\"27\" y=\"19\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#2f6fd6\"/></svg>"
  },
  {
    "id": "dip-switch-8",
    "name": "DIP switch",
    "sub": "4 or 8 switches",
    "section": "Switches and displays",
    "keywords": "",
    "send": {
      "type": "place",
      "part": "dip-switch-8"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"10\" y=\"12\" width=\"44\" height=\"24\" rx=\"1.5\" fill=\"#d33b30\"/><rect x=\"14.5\" y=\"16\" width=\"5\" height=\"16\" rx=\".8\" fill=\"#fff\"/><rect x=\"14.5\" y=\"25\" width=\"5\" height=\"7\" rx=\".8\" fill=\"#2a2826\"/><rect x=\"24.5\" y=\"16\" width=\"5\" height=\"16\" rx=\".8\" fill=\"#fff\"/><rect x=\"24.5\" y=\"16\" width=\"5\" height=\"7\" rx=\".8\" fill=\"#2a2826\"/><rect x=\"34.5\" y=\"16\" width=\"5\" height=\"16\" rx=\".8\" fill=\"#fff\"/><rect x=\"34.5\" y=\"25\" width=\"5\" height=\"7\" rx=\".8\" fill=\"#2a2826\"/><rect x=\"44.5\" y=\"16\" width=\"5\" height=\"16\" rx=\".8\" fill=\"#fff\"/><rect x=\"44.5\" y=\"16\" width=\"5\" height=\"7\" rx=\".8\" fill=\"#2a2826\"/></svg>"
  },
  {
    "id": "7seg-cc",
    "name": "7-segment",
    "sub": "One digit",
    "section": "Switches and displays",
    "keywords": "seven segment display",
    "send": {
      "type": "place",
      "part": "7seg-cc"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"18\" y=\"5\" width=\"28\" height=\"38\" rx=\"1.5\" fill=\"#201f1d\"/><rect x=\"26\" y=\"10\" width=\"12\" height=\"2.6\" rx=\"1\" fill=\"#e2362a\"/><rect x=\"37\" y=\"12\" width=\"2.6\" height=\"10\" rx=\"1\" fill=\"#e2362a\"/><rect x=\"37\" y=\"25\" width=\"2.6\" height=\"10\" rx=\"1\" fill=\"#3a2422\"/><rect x=\"26\" y=\"35\" width=\"12\" height=\"2.6\" rx=\"1\" fill=\"#e2362a\"/><rect x=\"24.4\" y=\"25\" width=\"2.6\" height=\"10\" rx=\"1\" fill=\"#e2362a\"/><rect x=\"24.4\" y=\"12\" width=\"2.6\" height=\"10\" rx=\"1\" fill=\"#3a2422\"/><rect x=\"26\" y=\"22.7\" width=\"12\" height=\"2.6\" rx=\"1\" fill=\"#e2362a\"/><circle cx=\"42\" cy=\"37\" r=\"1.4\" fill=\"#3a2422\"/></svg>"
  },
  {
    "id": "bargraph",
    "name": "LED bar graph",
    "sub": "10 segments",
    "section": "Switches and displays",
    "keywords": "array",
    "send": {
      "type": "place",
      "part": "bargraph"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"8\" y=\"14\" width=\"48\" height=\"20\" rx=\"1.2\" fill=\"#262422\"/><rect x=\"11.4\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#e2362a\"/><rect x=\"15.7\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#e2362a\"/><rect x=\"20\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#e2362a\"/><rect x=\"24.299999999999997\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#e2362a\"/><rect x=\"28.6\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#e2362a\"/><rect x=\"32.9\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#e2362a\"/><rect x=\"37.199999999999996\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#4a2c28\"/><rect x=\"41.5\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#4a2c28\"/><rect x=\"45.8\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#4a2c28\"/><rect x=\"50.099999999999994\" y=\"17\" width=\"2.6\" height=\"14\" rx=\".4\" fill=\"#4a2c28\"/></svg>"
  },
  {
    "id": "lcd-1602",
    "name": "LCD",
    "sub": "16 × 2 characters",
    "section": "Switches and displays",
    "keywords": "character display 1602 hd44780",
    "send": {
      "type": "place",
      "part": "lcd-1602"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"3\" y=\"7\" width=\"58\" height=\"34\" rx=\"1.5\" fill=\"#2f7a3c\"/><circle cx=\"5.4\" cy=\"9.4\" r=\"1.2\" fill=\"#e9e7e1\"/><circle cx=\"5.4\" cy=\"38.6\" r=\"1.2\" fill=\"#e9e7e1\"/><circle cx=\"58.6\" cy=\"9.4\" r=\"1.2\" fill=\"#e9e7e1\"/><circle cx=\"58.6\" cy=\"38.6\" r=\"1.2\" fill=\"#e9e7e1\"/><rect x=\"8.40\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"10.60\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"12.80\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"15.00\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"17.20\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"19.40\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"21.60\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"23.80\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"26.00\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"28.20\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"30.40\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"32.60\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"34.80\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"37.00\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"39.20\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"41.40\" y=\"9.00\" width=\"1.2\" height=\"1.2\" fill=\"#e5c86b\"/><rect x=\"7\" y=\"13\" width=\"50\" height=\"24\" rx=\"1\" fill=\"#1d1f1c\"/><rect x=\"9\" y=\"15.5\" width=\"46\" height=\"19\" fill=\"#9fc36a\"/><rect x=\"10.20\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"12.95\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"15.70\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"18.45\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"21.20\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"23.95\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"26.70\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"29.45\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"32.20\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"34.95\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"37.70\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"40.45\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"43.20\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"45.95\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"48.70\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"51.45\" y=\"17.6\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"10.20\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"12.95\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"15.70\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"18.45\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"21.20\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"23.95\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"26.70\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"29.45\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"32.20\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"34.95\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"37.70\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"40.45\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"43.20\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"45.95\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"48.70\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><rect x=\"51.45\" y=\"25.200000000000003\" width=\"2.3\" height=\"6\" fill=\"#93b85d\"/><text x=\"11.35\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">H</text><text x=\"14.10\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">e</text><text x=\"16.85\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">l</text><text x=\"19.60\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">l</text><text x=\"22.35\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">o</text><text x=\"25.10\" y=\"22\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">,</text><text x=\"11.35\" y=\"29.6\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">w</text><text x=\"14.10\" y=\"29.6\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">o</text><text x=\"16.85\" y=\"29.6\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">r</text><text x=\"19.60\" y=\"29.6\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">l</text><text x=\"22.35\" y=\"29.6\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" font-weight=\"500\" fill=\"#24331a\">d</text></svg>"
  },
  {
    "id": "74LS00",
    "name": "74LS00",
    "sub": "4 NAND gates",
    "section": "Logic chips",
    "keywords": "Quad 2-input NAND",
    "send": {
      "type": "place",
      "part": "74LS00"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS00</text></svg>"
  },
  {
    "id": "74LS02",
    "name": "74LS02",
    "sub": "4 NOR gates",
    "section": "Logic chips",
    "keywords": "Quad 2-input NOR",
    "send": {
      "type": "place",
      "part": "74LS02"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS02</text></svg>"
  },
  {
    "id": "74LS04",
    "name": "74LS04",
    "sub": "6 inverters",
    "section": "Logic chips",
    "keywords": "Hex inverter",
    "send": {
      "type": "place",
      "part": "74LS04"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS04</text></svg>"
  },
  {
    "id": "74LS14",
    "name": "74LS14",
    "sub": "6 Schmitt inverters",
    "section": "Logic chips",
    "keywords": "Hex Schmitt-trigger inverter",
    "send": {
      "type": "place",
      "part": "74LS14"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS14</text></svg>"
  },
  {
    "id": "74LS08",
    "name": "74LS08",
    "sub": "4 AND gates",
    "section": "Logic chips",
    "keywords": "Quad 2-input AND",
    "send": {
      "type": "place",
      "part": "74LS08"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS08</text></svg>"
  },
  {
    "id": "74LS10",
    "name": "74LS10",
    "sub": "3 NAND gates, 3 inputs",
    "section": "Logic chips",
    "keywords": "Triple 3-input NAND",
    "send": {
      "type": "place",
      "part": "74LS10"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS10</text></svg>"
  },
  {
    "id": "74LS11",
    "name": "74LS11",
    "sub": "3 AND gates, 3 inputs",
    "section": "Logic chips",
    "keywords": "Triple 3-input AND",
    "send": {
      "type": "place",
      "part": "74LS11"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS11</text></svg>"
  },
  {
    "id": "74LS27",
    "name": "74LS27",
    "sub": "3 NOR gates, 3 inputs",
    "section": "Logic chips",
    "keywords": "Triple 3-input NOR",
    "send": {
      "type": "place",
      "part": "74LS27"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS27</text></svg>"
  },
  {
    "id": "74LS32",
    "name": "74LS32",
    "sub": "4 OR gates",
    "section": "Logic chips",
    "keywords": "Quad 2-input OR",
    "send": {
      "type": "place",
      "part": "74LS32"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS32</text></svg>"
  },
  {
    "id": "74LS86",
    "name": "74LS86",
    "sub": "4 XOR gates",
    "section": "Logic chips",
    "keywords": "Quad 2-input XOR",
    "send": {
      "type": "place",
      "part": "74LS86"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS86</text></svg>"
  },
  {
    "id": "74LS74",
    "name": "74LS74",
    "sub": "2 flip-flops",
    "section": "Logic chips",
    "keywords": "Dual D flip-flop",
    "send": {
      "type": "place",
      "part": "74LS74"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS74</text></svg>"
  },
  {
    "id": "74LS76",
    "name": "74LS76",
    "sub": "2 JK flip-flops",
    "section": "Logic chips",
    "keywords": "Dual JK flip-flop",
    "send": {
      "type": "place",
      "part": "74LS76"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS76</text></svg>"
  },
  {
    "id": "74LS107",
    "name": "74LS107",
    "sub": "2 JK flip-flops",
    "section": "Logic chips",
    "keywords": "Dual JK flip-flop",
    "send": {
      "type": "place",
      "part": "74LS107"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS107</text></svg>"
  },
  {
    "id": "74LS138",
    "name": "74LS138",
    "sub": "3-to-8 decoder",
    "section": "Logic chips",
    "keywords": "3-to-8 decoder",
    "send": {
      "type": "place",
      "part": "74LS138"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS138</text></svg>"
  },
  {
    "id": "74LS139",
    "name": "74LS139",
    "sub": "2 2-to-4 decoders",
    "section": "Logic chips",
    "keywords": "Dual 2-to-4 decoder",
    "send": {
      "type": "place",
      "part": "74LS139"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS139</text></svg>"
  },
  {
    "id": "74LS47",
    "name": "74LS47",
    "sub": "7-segment decoder",
    "section": "Logic chips",
    "keywords": "BCD to 7-segment decoder",
    "send": {
      "type": "place",
      "part": "74LS47"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS47</text></svg>"
  },
  {
    "id": "74LS125",
    "name": "74LS125",
    "sub": "4 tri-state buffers",
    "section": "Logic chips",
    "keywords": "Quad tri-state buffer",
    "send": {
      "type": "place",
      "part": "74LS125"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"21.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"21.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"28.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"31.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"40.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.299999999999997\" y=\"17.5\" width=\"25.400000000000002\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M19.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS125</text></svg>"
  },
  {
    "id": "74LS157",
    "name": "74LS157",
    "sub": "4 2-to-1 switches",
    "section": "Logic chips",
    "keywords": "Quad 2-to-1 mux",
    "send": {
      "type": "place",
      "part": "74LS157"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS157</text></svg>"
  },
  {
    "id": "74HC153",
    "name": "74HC153",
    "sub": "2 4-to-1 switches",
    "section": "Logic chips",
    "keywords": "Dual 4-to-1 mux",
    "send": {
      "type": "place",
      "part": "74HC153"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74HC153</text></svg>"
  },
  {
    "id": "74LS161",
    "name": "74LS161",
    "sub": "4-bit counter",
    "section": "Logic chips",
    "keywords": "4-bit counter",
    "send": {
      "type": "place",
      "part": "74LS161"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS161</text></svg>"
  },
  {
    "id": "74LS193",
    "name": "74LS193",
    "sub": "Up and down counter",
    "section": "Logic chips",
    "keywords": "4-bit up/down counter",
    "send": {
      "type": "place",
      "part": "74LS193"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS193</text></svg>"
  },
  {
    "id": "74LS173",
    "name": "74LS173",
    "sub": "4-bit register",
    "section": "Logic chips",
    "keywords": "4-bit register",
    "send": {
      "type": "place",
      "part": "74LS173"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS173</text></svg>"
  },
  {
    "id": "74LS245",
    "name": "74LS245",
    "sub": "Bus buffer",
    "section": "Logic chips",
    "keywords": "Octal bus transceiver",
    "send": {
      "type": "place",
      "part": "74LS245"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"16.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"14.5\" y=\"17.5\" width=\"35\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M14.5 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.6\" fill=\"#d6d3cd\">74LS245</text></svg>"
  },
  {
    "id": "74LS273",
    "name": "74LS273",
    "sub": "8-bit register",
    "section": "Logic chips",
    "keywords": "Octal D flip-flop",
    "send": {
      "type": "place",
      "part": "74LS273"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"16.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"14.5\" y=\"17.5\" width=\"35\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M14.5 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.6\" fill=\"#d6d3cd\">74LS273</text></svg>"
  },
  {
    "id": "74LS283",
    "name": "74LS283",
    "sub": "4-bit adder",
    "section": "Logic chips",
    "keywords": "4-bit adder",
    "send": {
      "type": "place",
      "part": "74LS283"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS283</text></svg>"
  },
  {
    "id": "74HC595",
    "name": "74HC595",
    "sub": "Shift register",
    "section": "Logic chips",
    "keywords": "8-bit shift register",
    "send": {
      "type": "place",
      "part": "74HC595"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74HC595</text></svg>"
  },
  {
    "id": "74HC165",
    "name": "74HC165",
    "sub": "Parallel to serial",
    "section": "Logic chips",
    "keywords": "8-bit parallel-load shift register",
    "send": {
      "type": "place",
      "part": "74HC165"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74HC165</text></svg>"
  },
  {
    "id": "NE555",
    "name": "NE555",
    "sub": "Timer",
    "section": "Logic chips",
    "keywords": "Timer",
    "send": {
      "type": "place",
      "part": "NE555"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.1\" y=\"17.5\" width=\"15.8\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M24.1 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">NE555</text></svg>"
  },
  {
    "id": "W65C02S",
    "name": "W65C02S",
    "sub": "6502 processor",
    "section": "Memory and CPU",
    "keywords": "8-bit microprocessor",
    "send": {
      "type": "place",
      "part": "W65C02S"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"7.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"7.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"9.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"9.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"12.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"12.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"14.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"14.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"19.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"22.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"22.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"24.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"27.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"27.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"34.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"37.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"44.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"44.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"47.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"47.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"49.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"49.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"52.45\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"52.45\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"54.95\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"54.95\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"5.5\" y=\"17.5\" width=\"53\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M5.5 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.6\" fill=\"#d6d3cd\">65C02</text></svg>"
  },
  {
    "id": "AT28C256",
    "name": "AT28C256",
    "sub": "32K EEPROM",
    "section": "Memory and CPU",
    "keywords": "32K × 8 EEPROM",
    "send": {
      "type": "place",
      "part": "AT28C256"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"10.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"10.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"13.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"13.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"48.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"48.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"52.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"52.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"8.099999999999998\" y=\"17.5\" width=\"47.800000000000004\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M8.099999999999998 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.6\" fill=\"#d6d3cd\">28C256</text></svg>"
  },
  {
    "id": "62256",
    "name": "62256",
    "sub": "32K RAM",
    "section": "Memory and CPU",
    "keywords": "32K × 8 static RAM",
    "send": {
      "type": "place",
      "part": "62256"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"10.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"10.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"13.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"13.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"48.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"48.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"52.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"52.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"8.099999999999998\" y=\"17.5\" width=\"47.800000000000004\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M8.099999999999998 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.6\" fill=\"#d6d3cd\">62256</text></svg>"
  },
  {
    "id": "28C16",
    "name": "28C16",
    "sub": "2K EEPROM",
    "section": "Memory and CPU",
    "keywords": "2K × 8 EEPROM",
    "send": {
      "type": "place",
      "part": "28C16"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"13.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"13.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"16.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"45.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"48.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"48.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"11.299999999999997\" y=\"17.5\" width=\"41.400000000000006\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M11.299999999999997 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4.6\" fill=\"#d6d3cd\">28C16</text></svg>"
  },
  {
    "id": "74LS189",
    "name": "74LS189",
    "sub": "64-bit RAM",
    "section": "Memory and CPU",
    "keywords": "64-bit RAM (16 × 4)",
    "send": {
      "type": "place",
      "part": "74LS189"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"20.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"20.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"23.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"26.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"29.60\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"32.80\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"36.00\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"39.20\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"15.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"42.40\" y=\"29.5\" width=\"1.6\" height=\"3\" fill=\"#b5b3ae\"/><rect x=\"17.7\" y=\"17.5\" width=\"28.6\" height=\"13\" rx=\"1.2\" fill=\"#262422\"/><path d=\"M17.7 21.5a2.5 2.5 0 0 1 0 5z\" fill=\"#47443f\"/><text x=\"33\" y=\"25.7\" text-anchor=\"middle\" font-family=\"AtkinsonHyperlegibleMono_400Regular\" font-size=\"4\" fill=\"#d6d3cd\">74LS189</text></svg>"
  },
  {
    "id": "nano",
    "name": "Arduino Nano",
    "sub": "Runs sketches",
    "section": "Memory and CPU",
    "keywords": "atmega328 arduino",
    "send": {
      "type": "place",
      "part": "nano"
    },
    "svg": "<svg viewBox=\"0 0 64 48\"><rect x=\"4\" y=\"15\" width=\"56\" height=\"18\" rx=\"1.5\" fill=\"#1f5fa8\"/><rect x=\"1\" y=\"20\" width=\"9\" height=\"8\" rx=\"1\" fill=\"#c6c3bd\" stroke=\"#9c988f\" stroke-width=\".5\"/><rect x=\"27\" y=\"19\" width=\"10\" height=\"10\" rx=\".8\" fill=\"#1d1c1a\" transform=\"rotate(45 32 24)\"/><rect x=\"45\" y=\"21.5\" width=\"4\" height=\"5\" rx=\".6\" fill=\"#efede8\"/><rect x=\"12.35\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"12.35\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"15.45\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"15.45\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"18.55\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"18.55\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"21.65\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"21.65\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"24.75\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"24.75\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"27.85\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"27.85\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"30.95\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"30.95\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"34.05\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"34.05\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"37.15\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"37.15\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"40.25\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"40.25\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"43.35\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"43.35\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"46.45\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"46.45\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"49.55\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"49.55\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"52.65\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"52.65\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"55.75\" y=\"16.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/><rect x=\"55.75\" y=\"30.35\" width=\"1.3\" height=\"1.3\" fill=\"#e5c86b\"/></svg>"
  }
];
