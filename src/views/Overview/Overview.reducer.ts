export let initialState: { keyword: string } = {
  keyword: '',
};

const getDefaultState = () => ({
  keyword: '',
});

export type IState = typeof initialState;

export enum IAction {
  SET_KEYWORD = 'set_keyword',
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
