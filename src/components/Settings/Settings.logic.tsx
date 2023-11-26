/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer } from 'react';
import { IState, componentIsUnmounting, reducer, initialState, IAction } from './Settings.reducer';
import { setDialog } from '../../redux/reducer/dialogReducer';
import { useDispatch } from 'react-redux';
import { IAppDispatch } from '../../redux/store';
import { IDialogs } from '../../types/Dialogs/IDialogs';
import { IDialogAction } from '../../types/Dialogs/IDialogAction';

export const useSettings = () => {
  const dispatchCtx = useDispatch<IAppDispatch>();

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    return () => componentIsUnmounting();
  }, []);

  const toggleIsActive = () => {
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_IS_ACTIVE, payload });
  };

  const openEditDialog = useCallback(() => {
    dispatchCtx(
      setDialog({
        isOpen: IDialogs.WALLET,
        data: {
          action: IDialogAction.EDIT,
        },
      }),
    );
  }, []);

  const openDeleteDialog = useCallback(() => {
    dispatchCtx(setDialog({ isOpen: IDialogs.DELETE }));
  }, []);

  return { ...state, toggleIsActive, openEditDialog, openDeleteDialog };
};
