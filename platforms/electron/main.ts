import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import is from 'electron-is';
import log from 'electron-log';

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
      log.info(result.canceled);
      log.info(result.filePaths);
      if (result.filePaths) {
        event.sender.send('selectedDirectory', result.filePaths[0]);
      }
    })
    .catch((err) => {
      log.error(err);
    });
});
