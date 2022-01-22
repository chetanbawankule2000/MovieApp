const initialState = {
  isLoggedIn: false,
  loginTime: null, // login time in milliseconds
  isSignedUp: false,
  signinTime: null,
};

// reducer takes in actions and state and 'modifies' the state and returns it
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/login':
      return {
        isLoggedIn: true,
        loginTime: action.loginTime,
      };
    case 'auth/signin':
      return {
        isSignedUp: true,
        signupTime: action.signupTime,
      };
    case 'auth/logout':
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
