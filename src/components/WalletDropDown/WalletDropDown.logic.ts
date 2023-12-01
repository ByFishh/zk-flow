import React, { useEffect, useReducer } from 'react';
import { reducer, initialState, componentIsUnmounting, IState, IAction } from './WalletDropDown.reducer';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';

export const useWalletDropDown = () => {
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    return () => componentIsUnmounting();
  }, []);

  const toggleIsActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_IS_ACTIVE, payload });
  };

  return { ...state, toggleIsActive, currentBlockchain };
};
