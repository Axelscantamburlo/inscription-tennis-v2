
import { configureStore } from '@reduxjs/toolkit';

// REDUX PERSIST
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// REDUCERS
import schedulesReducer from './schedulesReducer';
import playeurInfoReducer from './playeurInfoReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, playeurInfoReducer);

const store = configureStore({
  reducer: {
    user: playeurInfoReducer,
    schedule: schedulesReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };