/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { reducer, initialState, IAction, IState } from "./Navbar.reducer";

export const useNavbar = () => {
  const location = useLocation();

  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  // UseEffect
  useEffect(() => onResize(), []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [state.menuIsDisplay]);

  useEffect(() => {
    if (state.currentRoute === location.pathname) return;
    setCurrentLocation();
  }, [state, location]);

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

  return { ...state, isCurrentLocation, toggleMenu };
};
