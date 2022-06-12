import { combineReducers } from "redux";
import AvatarReducer from "./avatarReducer";
import { NotificationReducer } from "./notificationReducer";

export const rootReducer = combineReducers({
  globalAvatar: AvatarReducer,
  notification: NotificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
