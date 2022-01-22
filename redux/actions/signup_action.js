export const signup_action = data => {
  console.log('inside action ', data);
  return async dispatch => {
    dispatch({
      type: 'user/data',
      Email: data.Email,
      PhoneNumber: data.PhoneNumber,
      registration_date: new Date(),
      Username: data.Username,
    });
  };
};
