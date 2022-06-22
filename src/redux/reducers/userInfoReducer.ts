import { AnyAction } from "redux";

interface UserInfoState {
  image: string;
  name: string;
}

const initialState: UserInfoState = {
  image: "",
  name: "",
};

export default function UserInfoReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "SET":
      return action.payload; //data dc truyen kem theo khi dispatch action
    default:
      return state;
  }
}
