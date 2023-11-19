import { useEffect, useReducer } from "react";
import { reducer, initialState, componentIsUnmounting, IState, IAction } from "./WalletDropDown.reducer";

export const useWalletDropDown = () => {
  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    return () => componentIsUnmounting();
  }, []);

  const toggleIsActive = () => {
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_IS_ACTIVE, payload });
  };

  return { ...state, toggleIsActive };
};
