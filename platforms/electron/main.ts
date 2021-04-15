import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { join } from 'path';
import { statSync } from 'fs';
import is from 'electron-is';
import log from 'electron-log';
import launchEditor from '@umijs/launch-editor';
import { getPkgInfo, getAlitaOrUmiVersion } from './utils';

log.transports.file.level = 'info';
log.info('(main/index) app start');

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}
function getPath(hash: string) {
  let path = `file://${join(__dirname, 'www')}/index.html${hash}`;
  if (is.dev()) {
    path = `http://127.0.0.1:8000${hash}`;
  }
  return path;
}
const pageList = {};
function createWindow(hash: string = '') {
  if (pageList[hash]) {
    pageList[hash].show();
    return pageList[hash];
  }
  const win = new BrowserWindow({
    width: 980,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.loadURL(getPath(hash));
  win.on('close', () => {
    pageList[hash] = null;
  });
  pageList[hash] = win;
  return win;
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
ipcMain.on('launchEditor', async (event, p) => {
  try {
    const res = await launchEditor(p);
    // @ts-ignore
    if (res && !res.success) {
      dialog.showMessageBox({
        type: 'error',
        message: '开启失败，请确认项目路径是否正确！',
      });
    }
  } catch (e) {
    dialog.showMessageBox({
      type: 'error',
      message: '开启失败，请确认项目路径是否正确！',
    });
  }
});
ipcMain.on('openWindos', (event, p) => {
  createWindow(p);
});
ipcMain.on('openDirectoryDialog', (event, p) => {
  dialog
    .showOpenDialog({ properties: [p] })
    .then((result) => {
      if (result.filePaths && result.filePaths[0]) {
        const pkg = getPkgInfo(join(result.filePaths[0], 'package.json'));
        const statInfo = statSync(result.filePaths[0]);
        const version = getAlitaOrUmiVersion(pkg);
        if (version.length) {
          event.sender.send('selectedDirectory', {
            name: pkg.name,
            description: pkg.description,
            keywords: pkg.keywords,
            license: pkg.license,
            version: version[0],
            key: result.filePaths[0],
            mtimeMs: statInfo.mtimeMs,
            blksize: statInfo.blksize,
          });
        } else {
          dialog.showMessageBox({
            type: 'error',
            message: '请选择一个正确的项目目录！',
          });
        }
      }
    })
    .catch((err) => {
      log.error(err);
    });
});
ipcMain.on('openPath', (event, p) => {
  shell.openPath(p);
});
