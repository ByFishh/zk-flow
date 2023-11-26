/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react';
import { IWallet } from '../types/Wallet/IWallet';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { IAppDispatch } from '../redux/store';
import { setWallets } from '../redux/reducer/walletReducer';

export const LOCAL_STORAGE_KEY = '@ZK_FLOW_WALLET_ITEMS';

export const useLocalStorage = () => {
  const dispatch = useDispatch<IAppDispatch>();

  useEffect(() => {
    initLocalStorage();
  }, []);

  const initLocalStorage = useCallback(() => {
    if (!getLocalStorage()) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  }, []);

  const addNewLocalStorage = (itemToAdd: IWallet): void => {
    try {
      const parsedLocalStorage = getParsedLocalStorage();
      itemToAdd.id = uuidv4();
      const newLocalStorage = [...parsedLocalStorage, itemToAdd];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalStorage));
      updateReducer(newLocalStorage);
    } catch (error) {
      initLocalStorage();
    }
  };

  const updateLocalStorage = (modifiedItem: IWallet): void => {
    try {
      const parsedLocalStorage = getParsedLocalStorage();
      const newLocalStorage = parsedLocalStorage.map((item) => (item.id === modifiedItem.id ? modifiedItem : item));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalStorage));
      updateReducer(newLocalStorage);
    } catch (error) {
      initLocalStorage();
    }
  };

  const deleteItemLocalStorage = (id: string): void => {
    const parsedLocalStorage = getParsedLocalStorage();
    const newLocalStorage = parsedLocalStorage.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalStorage));
    updateReducer(newLocalStorage);
  };

  const getParsedLocalStorage = useCallback((): IWallet[] => {
    const initialLocalStorage = getLocalStorage();
    if (!initialLocalStorage) throw new Error('No Local Storage found');
    return JSON.parse(initialLocalStorage) as IWallet[];
  }, []);

  const getLocalStorage = useCallback((): string | null => localStorage.getItem(LOCAL_STORAGE_KEY), []);

  const findWallet = (id: string) => getParsedLocalStorage().find((w) => w.id === id);

  const updateReducer = (updatedLocalStorage: IWallet[]) => dispatch(setWallets(updatedLocalStorage));

  return { addNewLocalStorage, updateLocalStorage, deleteItemLocalStorage, getParsedLocalStorage, findWallet };
};
