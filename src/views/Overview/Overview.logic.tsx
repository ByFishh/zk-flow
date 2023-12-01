import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { useEffect, useReducer } from 'react';
import { reducer, initialState, IAction, IState } from './Overview.reducer';
import { getWallet } from '../../blockchains';
import { Wallet } from '../../blockchains/types';
import { isTotalProperty } from '../../utils/isTotalProperty';
import { isChangeProperty } from '../../utils/isChangeProperty';
import { IGridInfo } from '../../types/Wallet/IGridInfo';

export const useOverview = () => {
  const { wallets } = useSelector((s: IRootState) => s.wallet);
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    getAllWalletsAsync();
  }, [currentBlockchain, wallets]);

  const getFilteredWallets = () => wallets.filter((item) => item.blockchain.includes(currentBlockchain));

  const toggleLoader = (isLoading: boolean) => {
    const payload: IState = { ...state, isLoading };
    dispatch({ type: IAction.SET_IS_LOADING, payload });
  };

  const getAllWalletsAsync = async () => {
    toggleLoader(true);
    const wallets: Wallet[] = [];
    const filteredWallets = getFilteredWallets();

    if (!filteredWallets.length) return;

    for (const w of filteredWallets) {
      const wallet = await getWallet(w.adress, currentBlockchain);
      if (!wallet.address) return;
      wallets.push(wallet);
    }

    const payload: IState = { ...state, wallets, isLoading: false };
    dispatch({ type: IAction.SET_WALLETS, payload });
  };

  const sumTotals = (key: keyof Wallet, value: string) => {
    return state.wallets.reduce((sum, wallet) => {
      const property = wallet[key];
      if (value === 'total' && isTotalProperty(property)) {
        return sum + property.total;
      }

      if (value === 'change' && isChangeProperty(property)) {
        return sum + property.change;
      }

      return sum;
    }, 0);
  };

  const getGridInfos = (address: string): IGridInfo[] => {
    const wallet = state.wallets.find((w) => w.address === address);
    if (!wallet) return [];

    const items = [
      { key: 'Interactions', value: wallet.interaction.total },
      { key: 'Volume', value: wallet.volume.total },
      { key: 'Fee spent', value: wallet.fee.total },
      { key: 'Contract', value: wallet.contract.total },
    ];
    return [...items, ...wallet.additionalInfos.map((item) => ({ key: item.label, value: item.value }))];
  };

  const handleSearch = (data: string) => {
    const payload: IState = { ...state, keyword: data };
    dispatch({ type: IAction.SET_KEYWORD, payload });
  };

  return { ...state, handleSearch, getFilteredWallets, sumTotals, getGridInfos };
};
