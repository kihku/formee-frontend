import { combineReducers } from "redux";
import UserInfoReducer from "./userInfoReducer";
import { NotificationReducer } from "./notificationReducer";

export const rootReducer = combineReducers({
  userInfo: UserInfoReducer,
  notification: NotificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
