import axios from 'axios';
import { saveData } from '../actions/actions';
import * as actionTypes from '../constants/constants';

const api = ({getState, dispatch}) => next => action => {
  next(action);

  if(action.type !== actionTypes.API) {
    return;
  }

  const config = {
    baseURL: 'https://napi.busbud.com/x-departures/',
    headers: {
      'Accept' : 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token' : 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    }
  };

  axios.get(action.payload, config)
      .then( response => dispatch(saveData(response.data)))
      .catch( error => console.log(error))

};

export default api;