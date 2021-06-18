import { BrowserWindow } from 'electron';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

export function loadHtmlByName(widget: BrowserWindow, name: string) {
  if (isDev) {
    widget.loadURL(`http://localhost:8080/${name}/`).catch(console.error);
    return;
  }
  widget.loadFile(path.resolve(__dirname, `../view/${name}/index.html`)).catch(console.error);
}



