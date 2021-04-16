const electron = window.require('electron');
const { ipcRenderer } = electron;

const messageHandlers: any[] = [];
const SocketPrefix = 'SocketResponse';

interface IAction<T = any, K = void> {
  type: string;
  payload?: T;
  onProgress?: (data: K) => void;
  onMessage?: (data: any) => void;
  keep?: boolean;
}

ipcRenderer.on(SocketPrefix, (e, payload) => {
  const { type, data } = payload;
  messageHandlers.forEach((h) => {
    h({ type, data });
  });
  // app.dispatch?.({ type: 'index/addList', payload: pkg });
});

export function callRemote<T = any, K = any>(action: IAction<T, K>): Promise<{ data: K }> {
  return new Promise((resolve, reject) => {
    function handler({ type, data }: { type: string; data: any }) {
      console.log(type);
      console.log(data);
      if (type === `${action.type}/success`) {
        if (!action.keep) removeHandler();
        resolve(data);
      }
      if (type === `${action.type}/failure`) {
        if (!action.keep) removeHandler();
        reject(data);
      }
      if (type === `${action.type}/progress` && action.onProgress) {
        action.onProgress(data);
      }
    }
    function removeHandler() {
      // eslint-disable-next-line no-restricted-syntax
      for (const [i, h] of messageHandlers.entries()) {
        if (h === handler) {
          messageHandlers.splice(i, 1);
          break;
        }
      }
    }
    messageHandlers.push(handler);
    ipcRenderer.send('MockSocketRequest', action);
  });
}
