import { createSlice } from '@reduxjs/toolkit';
import type { DialogsState } from './dialogs.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  errorDialogTitle: undefined,
  errorDialogMessage: undefined,
  showLoadingDialog: undefined,
  showDeleteAccountDialog: undefined,
} as DialogsState;

export const errorDialogSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setErrorDialogMessage(state, action: PayloadAction<string>) {
      state.errorDialogTitle = undefined;
      state.errorDialogMessage = action.payload;
    },
    setErrorDialogTitleMessage(
      state,
      action: PayloadAction<{ title: string; message: string }>,
    ) {
      state.errorDialogTitle = action.payload.title;
      state.errorDialogMessage = action.payload.message;
    },
    showLoadingDialog(state) {
      state.showLoadingDialog = true;
    },

    showDeleteAccountDialog(state) {
      state.showDeleteAccountDialog = true;
    },
    removeErrorDialog(state) {
      state.errorDialogTitle = undefined;
      state.errorDialogMessage = undefined;
    },
    removeLoadingDialog(state) {
      state.showLoadingDialog = undefined;
    },

    removeDeleteAccountDialog(state) {
      state.showDeleteAccountDialog = undefined;
    },
  },
});

export const {
  setErrorDialogMessage,
  setErrorDialogTitleMessage,
  showLoadingDialog,
  showDeleteAccountDialog,
  removeErrorDialog,
  removeLoadingDialog,
  removeDeleteAccountDialog,
} = errorDialogSlice.actions;

export default errorDialogSlice.reducer;
