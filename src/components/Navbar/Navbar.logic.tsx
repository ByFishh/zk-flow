/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { reducer, initialState, IAction, IState } from './Navbar.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '../../redux/store';
import { setBlockchain } from '../../redux/reducer/blockchainReducer';
import { Blockchain } from '../../blockchains/types';

export const useNavbar = () => {
  const location = useLocation();
  const dispatchCtx = useDispatch<IAppDispatch>();
  const { currentBlockchain } = useSelector((s: IRootState) => s.blockchain);

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  // Ref
  const firstRenderRef = useRef<boolean>(true);

  // UseEffect
  useEffect(() => onResize(), []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [state.menuIsDisplay]);

  useEffect(() => {
    if (isFirstRender()) return;
    if (state.currentRoute === location.pathname) return;
    setCurrentLocation();
  }, [state, location]);

  const isFirstRender = (): boolean => {
    const isFirstRender = firstRenderRef.current;
    if (isFirstRender) firstRenderRef.current = false;
    return isFirstRender;
  };

  const onResize = () => {
    if ((!state.menuIsDisplay && window.innerWidth > 768) || (state.menuIsDisplay && window.innerWidth <= 768))
      toggleMenu();
  };

  const setCurrentLocation = (): void => {
    const payload: IState = { ...state, currentRoute: location.pathname };
    dispatch({ type: IAction.SET_CURRENT_ROUTE, payload });
  };

  const toggleMenu = () => {
    const payload: IState = { ...state, menuIsDisplay: !state.menuIsDisplay };
    dispatch({ type: IAction.SET_MENU_IS_DISPLAY, payload });
  };

  const isCurrentLocation = (route: string): boolean => route === state.currentRoute;

  const onDropDownChange = (data: Blockchain[]) => {
    const selectedBlockchain = data[0];
    if (!selectedBlockchain) return;
    dispatchCtx(setBlockchain(selectedBlockchain));
  };

  return { ...state, isCurrentLocation, toggleMenu, currentBlockchain, onDropDownChange };
};
