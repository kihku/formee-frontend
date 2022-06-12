import { Alert, Fade, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "redux/actions/notification";
import { RootState } from "redux/store";

export interface CustomSnackBarProps {}

const CustomSnackBar: React.FC<CustomSnackBarProps> = () => {
  const { alertMessage } = useSelector((root: RootState) => root.notification);
  const dispatch = useDispatch();

  return (
    <>
      {alertMessage.open && (
        <Snackbar
          open={alertMessage.open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => dispatch(closeNotification())}
          autoHideDuration={3000}
        >
          <Alert onClose={() => dispatch(closeNotification())} severity={alertMessage.severity}>
            {alertMessage.content} {alertMessage.description}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CustomSnackBar;
