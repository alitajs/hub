import { Effect, Reducer, Subscription } from 'alita';
import isElectron from 'is-electron';
import { query } from '@/services/api';
import { getItemFromPath } from '@/utils';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export interface IndexModelState {
  name: string;
  loading: boolean;
  list: any[];
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    initList: Effect;
    // openDirectoryDialog: Effect;
    // openExternal: Effect;
    query: Effect;
    addList: Effect;
    deleteList: Effect;
    saveList: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
  };
  subscriptions: {
    selectedDirectory: any;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'index',

  state: {
    name: '',
    loading: false,
    list: [],
  },

  effects: {
    *initList({ payload }, { put }) {
      const data = localStorage.getItem('alitahublistdata') || '[]';
      yield put({
        type: 'saveList',
        payload: JSON.parse(data),
      });
    },
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
    *addList({ payload }, { select, call, put }) {
      let list = yield select((_) => _.index.list);
      const item = getItemFromPath(payload.key, list);
      list = list.filter((i) => i.key !== payload.key);
      list.unshift({ ...item, ...payload });
      yield put({
        type: 'saveList',
        payload: list,
      });
    },
    *deleteList({ payload }, { select, call, put }) {
      let list = yield select((_) => _.index.list);
      // const item = getItemFromPath(payload.key, list);
      list = list.filter((i) => i.key !== payload.key);
      // list.unshift({ ...item, ...payload });
      console.log(payload);
      console.log(list);
      yield put({
        type: 'saveList',
        payload: list,
      });
    },
    *saveList({ payload }, { select, call, put }) {
      localStorage.setItem('alitahublistdata', JSON.stringify(payload));
      yield put({
        type: 'save',
        payload: { list: payload },
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
  subscriptions: {
    selectedDirectory({ dispatch, history }) {
      return ipcRenderer.on('selectedDirectory', (e, pkg) => {
        dispatch?.({ type: 'addList', payload: pkg });
      });
    },
  },
};

export default IndexModel;
