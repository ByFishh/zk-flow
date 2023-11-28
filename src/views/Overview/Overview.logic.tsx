import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { useReducer } from 'react';
import { reducer, initialState, IAction, IState } from './Overview.reducer';

export const useOverview = () => {
  const { wallets } = useSelector((s: IRootState) => s.wallet);

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const handleSearch = (data: string) => {
    const payload: IState = { ...state, keyword: data };
    dispatch({ type: IAction.SET_KEYWORD, payload });
  };

  return { ...state, wallets, handleSearch };
};
