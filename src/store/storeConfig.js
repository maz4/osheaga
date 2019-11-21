import {applyMiddleware, compose, createStore} from 'redux';
import {reducer} from "../reducers";
import api from "../midleware/api";

export const storeConfig = initState => {

  const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  return createStore(reducer, initState, composeEnhancers(applyMiddleware(api)));
};