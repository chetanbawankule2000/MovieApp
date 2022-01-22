// ---- PACKAGES ----
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---- REDUCERS ----
import userReducer from './user_reducer';
import authReducer from './auth_reducer';

/* ---- NOTES ----

  we can have multiple reducers for each screen or component,
  all these will be combined here in rootReducer
  import your reducer and add it to the rootReducer

*/

const appReducer = combineReducers({
  //  use the 'keys' to refer to specific reducers like store.auth
  auth: authReducer,
  user: userReducer,
});

// to reset redux state on logout
// const rootReducer = (state, action) => {
//   if (action.type === 'auth/logout') {
//     // clear persist store
//     AsyncStorage.removeItem('persist:root');
//     // will return initial state if we pass undefined here
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

export default appReducer;
