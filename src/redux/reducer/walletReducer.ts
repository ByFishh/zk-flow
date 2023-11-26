import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWallet } from '../../types/Wallet/IWallet';
import { LOCAL_STORAGE_KEY } from '../../hook/useLocalStorage';

const getDefaultState = (): IWallet[] => {
  const initialLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!initialLocalStorage) return [];
  return JSON.parse(initialLocalStorage) as IWallet[];
};

const initialState: {
  wallets: IWallet[];
} = {
  wallets: getDefaultState(),
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    setWallets(state, action: PayloadAction<IWallet[]>) {
      state.wallets = action.payload;
    },
  },
});

export const { setWallets } = walletSlice.actions;
export default walletSlice.reducer;
