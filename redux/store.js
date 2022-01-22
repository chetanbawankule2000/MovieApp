// ---- PACKAGES ----
import {createStore} from 'redux';

// redux-persist wrappers
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; // merge level
// storage engine for redux persist
import AsyncStorage from '@react-native-async-storage/async-storage';
// encrypt redux store
import {encryptTransform} from 'redux-persist-transform-encrypt';

// main reducer (combination of all reducers)
import rootReducer from './reducers/root_reducer';

// redux-persist config
const persistConfig = {
  key: 'root',
  // storage engine used
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  // list the reducers that you want to be persisted on reloads

  whitelist: ['auth', 'user'],
  // encrypt persisted state with key
  // transforms allow you to modify the state while it is being stored
  // the state will be encrypted when it is stored and decrypted when it is retrieved
  transforms: [
    encryptTransform({
      // FIXME: use proper key, such as userToken
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        console.log('encrypt transform error');
      },
    }),
  ],
};

// create store using resist reducer
export const store = createStore(persistReducer(persistConfig, rootReducer));

export const persistor = persistStore(store);
