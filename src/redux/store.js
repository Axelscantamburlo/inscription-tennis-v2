import { configureStore } from "@reduxjs/toolkit";

// REDUX PERSIST
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// REDUCERS
import schedulesReducer from "./reducers/schedulesReducer";
import playeurInfoReducer from "./reducers/playeurInfoReducer";
const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, playeurInfoReducer);
// const persistedSchedulesReducer = persistReducer(persistConfig, schedulesReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    schedule: schedulesReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
