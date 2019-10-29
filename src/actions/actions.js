import axios from 'axios';
import * as actionTypes from '../constants/constants';

const config = {
  headers: {
    'Accept' : 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token' : 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
  }
};

const saveBusData = (data) => {
  return {
    type: actionTypes.SAVE_DATA,
    payload: data
  };
};

const setFetchError = error => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error
  };
};

export const fetchData = (params, data) => {

  const url = `https://napi.busbud.com/x-departures/${params}`;
  return dispatch => {
    axios.get(url, config, data)
      .then( reposnse => {
        dispatch(saveBusData(reposnse.data));
      })
      .catch( error => {
        dispatch(setFetchError(error));
      });
  }
}