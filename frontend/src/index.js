import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from "./state"
import { store } from './app/store'

// const store = configureStore({
//   reducer: {cart : cartReducer},

// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
