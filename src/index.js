import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/styles.css";
// import reportWebVitals from './reportWebVitals';

// REDUX

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// CONTEXT

import { AllDataSchedulesProvider } from "./context/AllDataSchedules";
import { UidUserConnectedProvider } from "./context/UidUserConnected";
import { AllDataUsersProvider } from "./context/AllDataUsers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <UidUserConnectedProvider>
        <AllDataSchedulesProvider>
          {/* <AllDataUsersProvider> */}
              <App />
          {/* </AllDataUsersProvider> */}
        </AllDataSchedulesProvider>
      </UidUserConnectedProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
