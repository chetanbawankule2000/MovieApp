const initialState = {
  userId: null,
  Username: null,
  Email: null,
  PhoneNumber: null,
  Password: null,
  registration_date: null,
};

// reducer takes in actions and state and 'modifies' the state and returns it
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'user/data':
      return {
        ...state,
        userId: action.userId,
        Username: action.Username,
        Email: action.Email,
        PhoneNumber: action.PhoneNumber,
        Password: action.Password,
        registration_date: action.registration_date,
      };
    default:
      return state;
  }
};

export default userReducer;
