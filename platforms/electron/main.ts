import { app, BrowserWindow, ipcMain, shell } from 'electron';
import is from 'electron-is';
import log from 'electron-log';
import { openInEditor, openWindos, selectAlitaPackage } from './actions';
import { createWindow } from './createWindow';

log.transports.file.level = 'info';
log.info('(main/index) app start');

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}

interface IAction<T = any, K = void> {
  type: string;
  payload?: T;
  onProgress?: (data: K) => void;
  onMessage?: (data: any) => void;
  keep?: boolean;
}

app.whenReady().then(() => {
  log.info('(main/index) app ready');
  createWindow('/');
  app.on('activate', () => {
    log.info('(main/index) app activate');
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('/');
    }
  });
});

app.on('window-all-closed', () => {
  log.info('(main/index) app window-all-closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * 统一都走这里，这样在web端能够模拟成请求交互体验
 * 如果事件有副作用，那需要sent(SocketPrefix,{ type:`${type}/${action}`,data:any })
 */
ipcMain.on('MockSocketRequest', (event, action: IAction) => {
  const { type, payload } = action;
  const { path } = payload;
  switch (type) {
    case 'openInEditor':
      openInEditor(path);
      break;
    case 'openWindos':
      openWindos(path);
      break;
    case 'selectAlitaPackage':
      selectAlitaPackage(event.sender);
      break;
    case 'openPath':
      shell.openPath(path);
      break;
    default:
      break;
  }
});
