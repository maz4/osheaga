import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers/reducer';

const store = createStore(reducer);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;