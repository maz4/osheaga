import React from 'react';
import { createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './reducers/reducer';
import api from './midleware/api';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(api)));

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;