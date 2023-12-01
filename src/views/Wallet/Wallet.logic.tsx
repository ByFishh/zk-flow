import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWallet } from '../../blockchains';
import { Blockchain } from '../../blockchains/types';
import { reducer, initialState, IState, IAction } from './Wallet.reducer';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';

export const useWallet = () => {
  const params = useParams();
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);
  const navigate = useNavigate();

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    getWalletAsync();
  }, [params]);

  useEffect(() => {
    navigate(`/wallet/${params.id}/${currentBlockchain}`);
  }, [currentBlockchain]);

  const toggleLoader = (isLoading: boolean) => {
    const payload: IState = { ...state, isLoading };
    dispatch({ type: IAction.SET_IS_LOADING, payload });
  };

  const getWalletAsync = async () => {
    toggleLoader(true);
    try {
      const { id, blockchain } = params;
      if (!id || !blockchain) return;
      const wallet = await getWallet(id, blockchain as Blockchain);
      if (!wallet.address) throw new Error('No Wallet found');
      const payload: IState = { ...state, wallet, isLoading: false };
      dispatch({ type: IAction.SET_WALLET, payload });
    } catch (error) {
      toggleLoader(false);
      console.error(error);
    }
  };

  return { ...state };
};
