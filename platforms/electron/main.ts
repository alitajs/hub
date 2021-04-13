import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import is from 'electron-is';
import log from 'electron-log';
import { getPkgInfo, checkIsAlitaPackage } from './utils';

log.transports.file.level = 'info';
log.info('(main/index) app start');

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}
function getPath() {
  let path = `file://${join(__dirname, 'www')}/index.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:8000/';
  }
  return path;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 980,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.loadURL(getPath());
}

app.whenReady().then(() => {
  log.info('(main/index) app ready');
  createWindow();

  app.on('activate', () => {
    log.info('(main/index) app activate');
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  log.info('(main/index) app window-all-closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('openDirectoryDialog', function (event, p) {
  dialog
    .showOpenDialog({ properties: [p] })
    .then((result) => {
      if (result.filePaths && result.filePaths[0]) {
        const pkg = getPkgInfo(join(result.filePaths[0], 'package.json'));
        const isAlita = checkIsAlitaPackage(pkg);
        if (isAlita) {
          event.sender.send('selectedDirectory', pkg);
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
