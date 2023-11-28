import { configureStore } from '@reduxjs/toolkit';
import DialogReducer from './reducer/dialogReducer';
import walletReducer from './reducer/walletReducer';
import blockchainReducer from './reducer/blockchainReducer';

const rootReducer = {
  dialog: DialogReducer,
  wallet: walletReducer,
  blockchain: blockchainReducer,
};

export const initStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const store = initStore();

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export type IStore = ReturnType<typeof initStore>;

export default store;
