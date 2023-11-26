/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect, useRef } from 'react';
import { reducer, initialState, IState, IAction } from './DropDown.reducer';
import { preventBigString } from '../../utils/preventBigString';

export const useDropDown = (props: {
  multiple?: boolean;
  onChange?: (data: string[]) => void;
  initialValues?: string[];
}) => {
  // State
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  // Refs
  const firstRender = useRef<boolean>(true);
  const dropDownContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialValues();
  }, []);

  useEffect(() => {
    window.addEventListener('click', preventOutsideClick);
    return () => window.removeEventListener('click', preventOutsideClick);
  }, [state]);

  useEffect(() => {
    sendDataToParent();
  }, [state.items]);

  const preventOutsideClick = (e: any) => {
    if (!state.isActive) return;
    const getClassAttribute = e.target.getAttribute('class');
    if (!dropDownContainer.current) return;
    if (!dropDownContainer.current.contains(e.target) && getClassAttribute !== 'dropDown-item') toggleIsActive();
  };

  // const handleClickOutside = (event: MouseEvent) => {};

  const sendDataToParent = () => {
    if (firstRender.current) return (firstRender.current = false);
    const items = state.items.filter((item) => item.isChecked).map((item) => item.name);
    props.onChange && props.onChange(items);
  };

  const setInitialValues = () => {
    if (!props.initialValues || !props.initialValues.length) return;
    const items = [...state.items].map((item) =>
      props.initialValues?.includes(item.name) ? { ...item, isChecked: true } : { ...item },
    );
    const payload: IState = { ...state, items };
    dispatch({ type: IAction.TOGGLE_ITEM_CHECK, payload });
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
      const resetItems = itemsCopy.map((item) => ({
        ...item,
        isChecked: false,
      }));
      resetItems.splice(itemIndex, 1, newItem);
      payload = { ...state, items: resetItems };
    }
    dispatch({ type: IAction.TOGGLE_ITEM_CHECK, payload });
  };

  const getSelectedItem = (): string => {
    const getCheckedItem = state.items.find((item) => item.isChecked);
    if (!getCheckedItem) return '';
    return preventBigString(getCheckedItem.name, 14);
  };

  const toggleIsActive = (): void => {
    const payload: IState = { ...state, isActive: !state.isActive };
    dispatch({ type: IAction.TOGGLE_ITEM_CHECK, payload });
  };

  return { ...state, handleDropDown, getSelectedItem, toggleIsActive, dropDownContainer };
};
