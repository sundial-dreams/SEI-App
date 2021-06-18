import { EventEmitter } from 'events';
import { BrowserWindow, ipcMain } from 'electron';

import { loadHtmlByName } from '../tools';
import { CustomWidgetConfig } from '../tools/constants';


export interface IWidget {
  build(parent?: BrowserWindow): void;

  isBuild(): boolean,

  reset(): void,

  close(): void,

  hide(): void,

  display(): void
}


export default class Widget extends EventEmitter implements IWidget {
  protected _widget: BrowserWindow | null = null;
  protected width: number;
  protected height: number;
  protected name: string;

  constructor() {
    super();
    ipcMain.on('__CLOSE__', () => {
      if (this._widget && this._widget.isClosable()) {
        this._widget.close();
      }
    });

    ipcMain.on('__MAXIMIZE__', () => {
      if (this._widget) {
        if (this._widget.isMaximized()) {
          this._widget.unmaximize();
          return;
        }
        this._widget.maximize();
      }
    });

    ipcMain.on('__MINIMIZE__', () => {
      if (this._widget && this._widget.isMinimizable() && !this._widget.isMinimized()) {
        this._widget.minimize();
      }
    });
  }

  build(parent?:BrowserWindow) {

    if (this._widget) return;

    this._widget = new BrowserWindow({
      ...CustomWidgetConfig,
      minWidth: this.width,
      minHeight: this.height,
      width: this.width,
      height: this.height,

      maximizable: true,
      minimizable: true,
      closable: true,
    });

    loadHtmlByName(this._widget, this.name);

    this._widget.on('close', () => this.reset());

  }

  isBuild(): boolean {
    return this._widget !== null;
  }

  reset() { this._widget = null; }

  close() {
    this._widget?.close();
    this.reset();
  }

  hide() {
    this._widget?.hide();
  }

  display() {
    this._widget?.show();
  }
}