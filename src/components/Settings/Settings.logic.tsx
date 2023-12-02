/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef } from 'react';
import { IState, componentIsUnmounting, reducer, initialState, IAction } from './Settings.reducer';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { useDispatch } from 'react-redux';
import { IAppDispatch } from '../../redux/store';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import { IDialogAction } from '../../types/Dialogs/IDialogAction';
import { useLocalStorage } from '../../hook/useLocalStorage';

export const useSettings = (props: { id: string }) => {
  const dispatchCtx = useDispatch<IAppDispatch>();
  const { findWallet } = useLocalStorage();

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  // Refs
  const dropDownContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => componentIsUnmounting();
  }, []);

  useEffect(() => {
    window.addEventListener('click', preventOutsideClick);
    return () => window.removeEventListener('click', preventOutsideClick);
  }, [state]);

  const preventOutsideClick = (e: MouseEvent) => {
    if (!state.isActive) return;
    if (!dropDownContainer.current) return;
    if (e.target instanceof Node && !dropDownContainer.current.contains(e.target)) toggleIsActive();
  };

  const toggleIsActive = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_IS_ACTIVE, payload });
  };

  const openEditDialog = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const wallet = findWallet(props.id);
    if (!wallet) throw new Error('No Wallet found with this ID');

    dispatchCtx(
      setDialog({
        isOpen: IDialogs.WALLET,
        data: {
          action: IDialogAction.EDIT,
          wallet,
        },
      }),
    );
    toggleIsActive();
  };

  const openDeleteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!props.id) throw new Error('No ID to delete');
    dispatchCtx(setDialog({ isOpen: IDialogs.DELETE, data: { id: props.id } }));
    toggleIsActive();
  };

  return { ...state, toggleIsActive, openEditDialog, openDeleteDialog, dropDownContainer };
};
