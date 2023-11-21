import { useReducer } from "react";
import { IAction, IState, reducer, initialState } from "./AirdropItem.reducer";

export const useAirdropItem = (props: { title: string; items: { txt: string; checked: boolean }[] }) => {
  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const toggleIsActive = (): void => {
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_IS_ACTIVE, payload });
  };

  const getStateColor = () => {
    const checkedArr = props.items.filter((item) => item.checked);
    if (!checkedArr.length) return "#FF7171";
    if (checkedArr.length === props.items.length) return "#20EC72";
    return "#FFB571";
  };

  return { ...state, toggleIsActive, getStateColor };
};
