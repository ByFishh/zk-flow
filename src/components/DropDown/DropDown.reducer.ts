export let initialState: { isActive: boolean; items: { name: string; isChecked: boolean }[] } = {
  isActive: false,
  items: [
    { name: "zkSync", isChecked: false },
    { name: "Bitcoin", isChecked: false },
    { name: "Scroll", isChecked: false },
  ],
};

const getDefaultState = () => ({
  isActive: false,
  items: [
    { name: "zkSync", isChecked: false },
    { name: "Bitcoin", isChecked: false },
    { name: "Scroll", isChecked: false },
  ],
});

export type IState = typeof initialState;

export enum IAction {
  TOGGLE_IS_ACTIVE = "toggle_is_active",
  TOGGLE_ITEM_CHECK = "toggle_item_check",
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
