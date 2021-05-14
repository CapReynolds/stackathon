import { LOGIN_USER } from '../storeComponents/loginUser';

const userReducer = (state = {}, action) => {
  if (action.type === LOGIN_USER) {
    return { ...state, ...action.user };
  }
  return state;
};

export default userReducer;
