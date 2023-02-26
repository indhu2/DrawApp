import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from "../reducers";
import createSensitiveStorage from 'redux-persist-sensitive-storage';

const storage = createSensitiveStorage({
  keychainService: 'opKeychain',
  sharedPreferencesName: 'opSharedPrefs',
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['home'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;