import { BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';

/**
 * 获取页面的真实地址，主要用于区分开发环境还是生产环境
 * @param hash 页面的路由
 * @returns url
 */
const getPath = (hash: string = '') => {
  let path = `file://${join(__dirname, 'www')}/index.html${hash}`;
  if (is.dev()) {
    path = `http://127.0.0.1:8000${hash}`;
  }
  return path;
};

const pageList = {};

/**
 * 创建一个窗口的实体
 * @param hash 页面的 hash
 * @returns
 */
export const createWindow = (hash: string = '') => {
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
};
