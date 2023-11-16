/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from "react";
import { reducer, initialState, IState, IAction } from "./DropDown.reducer";
import { preventBigString } from "../../utils/preventBigString";

export const useDropDown = (props: { multiple: boolean; onChange?: (data: string[]) => void }) => {
  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    sendDataToParent();
  }, [state.items]);

  const sendDataToParent = () => {
    const items = state.items.filter((item) => item.isChecked).map((item) => item.name);
    props.onChange && props.onChange(items);
  };

  const handleDropDown = (name: string): void => {
    let payload: IState = state;
    const itemsCopy = [...state.items];
    const itemIndex = itemsCopy.findIndex((item) => item.name === name);
    if (itemIndex === -1) return;
    const getItem = itemsCopy[itemIndex];
    const newItem = { ...getItem, isChecked: !getItem.isChecked };

    if (props.multiple) {
      itemsCopy.splice(itemIndex, 1, newItem);
      payload = { ...state, items: [...itemsCopy] };
      dispatch({ type: IAction.TOGGLE_ITEM_CHECK, payload });
    } else {
      const resetItems = itemsCopy.map((item) => ({ ...item, isChecked: false }));
      resetItems.splice(itemIndex, 1, newItem);
      payload = { ...state, items: resetItems };
    }

    dispatch({ type: IAction.TOGGLE_ITEM_CHECK, payload });
  };

  const getSelectedItem = (): string => {
    const getCheckedItem = state.items.find((item) => item.isChecked);
    if (!getCheckedItem) return "";
    return preventBigString(getCheckedItem.name, 14);
  };

  const toggleIsActive = (): void => {
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_ITEM_CHECK, payload });
  };

  return { ...state, handleDropDown, getSelectedItem, toggleIsActive };
};
