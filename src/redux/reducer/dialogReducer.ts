import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialogs } from "../../types/Dialogs/IDialogs";

const initialState: {
  isOpen: IDialogs | undefined;
  data?: unknown;
} = {
  isOpen: undefined,
  data: undefined,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    setDialog(
      state,
      action: PayloadAction<Pick<typeof initialState, "isOpen" | "data">>
    ) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
