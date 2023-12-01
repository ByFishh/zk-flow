import { Wallet } from '../../blockchains/types';

export let initialState: { wallet: Wallet; isLoading: boolean } = {
  wallet: {} as Wallet,
  isLoading: true,
};

const getDefaultState = () => ({
  wallet: {} as Wallet,
  isLoading: true,
});

export type IState = typeof initialState;

export enum IAction {
  SET_WALLET = 'set_wallet',
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
