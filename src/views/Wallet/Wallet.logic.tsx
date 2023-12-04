import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWallet } from '../../blockchains';
import { Blockchain } from '../../blockchains/types';
import { reducer, initialState, IState, IAction } from './Wallet.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../../redux/store';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { setBlockchain } from '../../redux/reducer/blockchainReducer';

export const useWallet = () => {
  const params = useParams();
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);
  const navigate = useNavigate();
  const dispatchCtx = useDispatch<IAppDispatch>();

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    getWalletAsync();
    if (!params.blockchain) return;
    dispatchCtx(setBlockchain(params.blockchain as Blockchain));
  }, [params]);

  useEffect(() => {
    navigate(`/wallet/${currentBlockchain}/${params.id}`);
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

  const handleADClick = () => {
    const url = 'https://www.universalchains.io/';
    dispatchCtx(setDialog({ isOpen: IDialogs.UNKNOWN_URL, data: { url } }));
  };

  return { ...state, handleADClick };
};
