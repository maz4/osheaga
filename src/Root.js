import React from 'react';
import { createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers/reducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducer, composeEnhancers());
// const store = createStore(reducer);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;