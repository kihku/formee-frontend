import React from "react";
import { useSelector } from "react-redux";
import { ConfirmationDialog } from ".";
import { RootState } from "../../redux/reducers/rootReducer";

export const ConfirmDialogControl = () => {
  const { dialogContext } = useSelector((state: RootState) => state.confirmDialog);

  return (
    <>
      {dialogContext.open && (
        <ConfirmationDialog
          id={`${dialogContext.id}`}
          keepMounted
          open={dialogContext.open}
          title={`${dialogContext.title}`}
          content={dialogContext.content}
          onClose={dialogContext.onClose}
          value={`${dialogContext.value}`}
        />
      )}
    </>
  );
};
