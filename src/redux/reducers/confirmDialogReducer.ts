import { ConfirmationDialogAction } from "redux/actions/confirmDialog";

export interface ConfirmationDialog {
  id: String;
  value?: String;
  open: boolean;
  title: String;
  content?: String;
  onClose: (isOk?: boolean) => void;
}

export interface ConfirmationDialogState {
  dialogContext: ConfirmationDialog;
}

const initialState: ConfirmationDialogState = {
  dialogContext: {
    id: "",
    open: false,
    title: "",
    onClose: () => {},
  },
};

export const ConfirmationDialogReducer = (
  state: ConfirmationDialogState = initialState,
  action: ConfirmationDialogAction,
) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { ...state, dialogContext: { ...action.confirmationDialog } };
    case "CLOSE_DIALOG":
      return { ...state, dialogContext: { ...action.confirmationDialog } };
    default:
      return state;
  }
};
