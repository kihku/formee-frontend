import { ConfirmationDialog } from "../reducers/confirmDialogReducer";

export type ConfirmationDialogAction = {
  type: "OPEN_DIALOG" | "CLOSE_DIALOG";
  confirmationDialog: ConfirmationDialog;
};

export const openConfirmation = (confirmationDialog: ConfirmationDialog): ConfirmationDialogAction => {
  return {
    type: "OPEN_DIALOG",
    confirmationDialog,
  };
};

export const closeConfirmation = (): ConfirmationDialogAction => {
  return {
    type: "CLOSE_DIALOG",
    confirmationDialog: {
      id: "",
      open: false,
      content: "",
      title: "",
      onClose: () => {},
    },
  };
};
