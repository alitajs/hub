import type { IpcRenderer } from 'electron';

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';
declare module 'binary-mirror-config';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}
