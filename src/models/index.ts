import type { Effect, Reducer } from 'alita';
import { query } from '@/services/api';
import { getItemFromPath } from '@/utils';

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
    query: Effect;
    addList: Effect;
    deleteList: Effect;
    saveList: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
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
    *initList(_, { put }) {
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
    *addList({ payload }, { select, put }) {
      let list = yield select((_: any) => _.index.list);
      const item = getItemFromPath(payload.key, list);
      list = list.filter((i: any) => i.key !== payload.key);
      list.unshift({ ...item, ...payload });
      yield put({
        type: 'saveList',
        payload: list,
      });
    },
    *deleteList({ payload }, { select, put }) {
      let list = yield select((_: any) => _.index.list);
      list = list.filter((i: any) => i.key !== payload.key);
      yield put({
        type: 'saveList',
        payload: list,
      });
    },
    *saveList({ payload }, { put }) {
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
};

export default IndexModel;
