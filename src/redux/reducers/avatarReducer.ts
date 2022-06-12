import { AnyAction } from 'redux'

interface AvatarState {
  value: string
}

const initialState: AvatarState = {
  value: ""
}

export default function AvatarReducer(
  state = initialState,
  action: AnyAction
) {
    switch (action.type){
        case 'SET':
            return action.payload; //data dc truyen kem theo khi dispatch action
        default:
            return state;
    }
}