import { Effect, Reducer } from 'alita';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export interface GlobalModelState {
  loading: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    sendIpc: Effect;
  };
  reducers: {
    save: Reducer<GlobalModelState>;
  };
}

const IndexModel: GlobalModelType = {
  namespace: 'global',

  state: {
    loading: false,
  },

  effects: {
    *sendIpc({ payload }, { put }) {
      const { type, data = '' } = payload;
      ipcRenderer.send(type, data);
      yield put({
        type: 'save',
        payload: { loading: true },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default IndexModel;
