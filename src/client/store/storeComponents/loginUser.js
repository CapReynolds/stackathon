

// action type
const LOGIN_USER = 'LOGIN_USER';

// action creators
const _loginUser = (user) => ({ type: LOGIN_USER, user });

// thunk
const loginUser = (user) => async (dispatch) => {
  try {
    dispatch(_loginUser(user));
  } catch (err) {
    console.log(err.response);
  }
};

export { loginUser, LOGIN_USER};
