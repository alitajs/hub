import { dialog } from 'electron';
import type { WebContents } from 'electron';
import log from 'electron-log';
import launchEditor from '@umijs/launch-editor';
import { statSync } from 'fs';
import { join } from 'path';
import { createWindow } from './createWindow';
import { getPkgInfo, getAlitaOrUmiVersion } from './utils';

type PropertiesType =
  | 'openFile'
  | 'openDirectory'
  | 'multiSelections'
  | 'showHiddenFiles'
  | 'createDirectory'
  | 'promptToCreate'
  | 'noResolveAliases'
  | 'treatPackageAsDirectory'
  | 'dontAddToRecent';

const SocketPrefix = 'SocketResponse';

/**
 * 在编辑器中打开
 * @param path 项目所在的目录
 */
export const openInEditor = async (path: string) => {
  try {
    const res = await launchEditor(path);
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
};

/**
 * 打开一个新的窗口，相当于在新的窗口中打开页面
 * @param path 页面的 hash 值，需要完整的值，如 create 页面，需要传 '/#/create'
 */
export const openWindos = (path: string) => {
  createWindow(path);
};

/**
 * 选择一个目录
 * @param sender 当前事件的 sender
 */
export const selectDirectory = (sender: WebContents) => {
  dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      if (result.filePaths && result.filePaths[0]) {
        sender.send(SocketPrefix, {
          type: 'selectAlitaPackage/success',
          data: {
            path: result.filePaths[0],
          },
        });
      }
    })
    .catch((err) => {
      log.error(err);
    });
};

/**
 * 选择一个 alita 项目，alita|umi|bigfish|dumi
 * @param sender 当前事件的 sender
 */
export const selectAlitaPackage = (sender: WebContents) => {
  dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      if (result.filePaths && result.filePaths[0]) {
        const pkg = getPkgInfo(join(result.filePaths[0], 'package.json'));
        const statInfo = statSync(result.filePaths[0]);
        const version = getAlitaOrUmiVersion(pkg);
        if (version.length) {
          sender.send(SocketPrefix, {
            type: 'selectAlitaPackage/success',
            data: {
              name: pkg.name,
              description: pkg.description,
              keywords: pkg.keywords,
              license: pkg.license,
              version: version[0],
              key: result.filePaths[0],
              mtimeMs: statInfo.mtimeMs,
              blksize: statInfo.blksize,
            },
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
};
