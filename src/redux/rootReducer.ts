import { combineReducers } from "redux";
import AvatarReducer from "./avatarReducer";

export const rootReducer = combineReducers({
    globalAvatar:AvatarReducer,
});
export type RootState = ReturnType<typeof rootReducer>;