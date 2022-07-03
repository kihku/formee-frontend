import { combineReducers } from "redux";
import UserInfoReducer from "./userInfoReducer";
import { NotificationReducer } from "./notificationReducer";
import { ConfirmationDialogReducer } from "./confirmDialogReducer";

export const rootReducer = combineReducers({
  userInfo: UserInfoReducer,
  notification: NotificationReducer,
  confirmDialog: ConfirmationDialogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
