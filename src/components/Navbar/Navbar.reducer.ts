export let initialState: { currentRoute: string; menuIsDisplay: boolean } = {
  currentRoute: "/",
  menuIsDisplay: false,
};

const getDefaultState = () => ({
  currentRoute: "",
  menuIsDisplay: false,
});

export type IState = typeof initialState;

export enum IAction {
  SET_CURRENT_ROUTE = "set_current_route",
  SET_MENU_IS_DISPLAY = "set_menu_is_display",
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
