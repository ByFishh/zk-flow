import { useEffect, useReducer } from "react";
import {
  IState,
  componentIsUnmounting,
  reducer,
  initialState,
  IAction,
} from "./Settings.reducer";

export const useSettings = () => {
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
