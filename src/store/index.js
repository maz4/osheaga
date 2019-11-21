import { applyMiddleware, compose, createStore } from 'redux';
import {reducer} from "../reducers";
import api from "../midleware/api";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(api)));