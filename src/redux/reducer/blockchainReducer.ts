/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blockchain } from '../../blockchains/types';

const initialState: {
  currentBlockchain: Blockchain;
} = {
  currentBlockchain: Blockchain.zkSync,
};

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState: initialState,
  reducers: {
    setBlockchain(state, action: PayloadAction<Blockchain>) {
      state.currentBlockchain = action.payload;
    },
  },
});

export const { setBlockchain } = blockchainSlice.actions;
export default blockchainSlice.reducer;
