import { initDataUser, UserDTO } from "models/user";
import { AnyAction } from "redux";

const initialState: UserDTO = initDataUser;

export default function UserInfoReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "SET":
      return action.payload; // data dc truyen kem theo khi dispatch action
    default:
      return state;
  }
}
