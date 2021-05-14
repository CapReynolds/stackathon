

// action type
const LOGIN_USER = 'LOGIN_USER';

// action creators
const _loginUser = (user) => ({ type: LOGIN_USER, user });

// thunk
const loginUser = (user) => async (dispatch) => {
  try {
    // const response = await axios.post('/api/login/auth', user);
    // const { token, error } = response.data;
    // let authenticatedUser;
    // if (error) {
    //   dispatch(_getLoginError(error));
    // } else if (token) {
    //   window.localStorage.setItem('token', token);
    //   authenticatedUser = await axios.get('/api/login/auth', getToken());
    // }
    // delete authenticatedUser.data.password;
    dispatch(_loginUser(user));
  } catch (err) {
    console.log(err.response);
  }
};

export { loginUser, LOGIN_USER};
