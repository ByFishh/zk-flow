import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getWallet } from '../../blockchains';
import { Blockchain } from '../../blockchains/types';
import { reducer, initialState, IState, IAction } from './Wallet.reducer';

export const useWallet = () => {
  const params = useParams();

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    getWalletAsync();
  }, [params]);

  const getWalletAsync = async () => {
    try {
      const { id, blockchain } = params;
      if (!id || !blockchain) return;
      const wallet = await getWallet(id, blockchain as Blockchain);
      if (!wallet.address) throw 'No Wallet found';
      const payload: IState = { ...state, wallet };
      dispatch({ type: IAction.SET_WALLET, payload });
    } catch (error) {
      console.error(error);
    }
  };

  return { ...state };
};
