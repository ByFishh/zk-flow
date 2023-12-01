import { Wallet } from '../../blockchains/types';

export let initialState: { keyword: string; wallets: Wallet[]; isLoading: boolean } = {
  keyword: '',
  wallets: [],
  isLoading: false,
};

const getDefaultState = () => ({
  keyword: '',
  wallets: [],
  isLoading: false,
});

export type IState = typeof initialState;

export enum IAction {
  SET_KEYWORD = 'set_keyword',
  SET_WALLETS = 'set_wallets',
  SET_IS_LOADING = 'set_is_loading',
}
export const componentIsUnmounting = () => {
  initialState = getDefaultState();
};

const actionHandlers = Object.fromEntries(
  Object.values(IAction).map((action) => [action, (_: IState, payload: IState) => ({ ...payload })]),
);

export function reducer(state: IState, { type, payload }: { type: IAction; payload: IState }): IState {
  const actionHandler = actionHandlers[type] || ((state) => state);
  return actionHandler(state, payload);
}
