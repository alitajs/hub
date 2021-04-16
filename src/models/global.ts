import type { Reducer } from 'alita';

export interface GlobalModelState {
  loading: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    save: Reducer<GlobalModelState>;
  };
}

const IndexModel: GlobalModelType = {
  namespace: 'global',

  state: {
    loading: false,
  },

  effects: {},
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
