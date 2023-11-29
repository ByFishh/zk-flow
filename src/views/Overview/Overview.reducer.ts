import { Wallet } from '../../blockchains/types';

export let initialState: { keyword: string; wallets: Wallet[] } = {
  keyword: '',
  wallets: [],
};

const getDefaultState = () => ({
  keyword: '',
  wallets: [],
});

export type IState = typeof initialState;

export enum IAction {
  SET_KEYWORD = 'set_keyword',
  SET_WALLETS = 'set_wallets',
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
