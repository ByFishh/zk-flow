export let initialState: {
  isActive: boolean;
} = {
  isActive: false,
};

const getDefaultState = () => ({
  isActive: false,
});

export type IState = typeof initialState;

export enum IAction {
  TOGGLE_IS_ACTIVE = "toggle_is_active",
}
export const componentIsUnmounting = () => {
  initialState = getDefaultState();
};

const actionHandlers = Object.fromEntries(
  Object.values(IAction).map((action) => [action, (_: IState, payload: IState) => ({ ...payload })])
);

export function reducer(state: IState, { type, payload }: { type: IAction; payload: IState }): IState {
  const actionHandler = actionHandlers[type] || ((state) => state);
  return actionHandler(state, payload);
}
