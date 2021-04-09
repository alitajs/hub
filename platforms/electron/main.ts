import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import is from 'electron-is';

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
  });
  win.loadURL(getPath());
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
