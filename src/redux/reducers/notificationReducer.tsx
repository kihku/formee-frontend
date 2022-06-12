import { NotificationAction } from "redux/actions/notification";

export interface AlertMessage {
  severity: "success" | "error" | "warning";
  open?: boolean;
  title?: string;
  content?: string;
  desc?: string;
  description?: string;
}

export interface NotifyState {
  alertMessage: AlertMessage;
}

const initialState: NotifyState = {
  alertMessage: {
    severity: "success",
    open: false,
    title: "",
    desc: "",
  },
};

export const NotificationReducer = (state: NotifyState = initialState, action: NotificationAction) => {
  switch (action.type) {
    case "OPEN":
      return { ...state, alertMessage: { ...action.alertMessage } };
    case "CLOSE":
      return { ...state, alertMessage: { ...action.alertMessage } };
    default:
      return state;
  }
};
