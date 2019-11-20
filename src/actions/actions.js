import * as actionTypes from '../constants/constants';

const saveLocationAndDepartures = payload => {
  return {
    type: actionTypes.SAVE_LOCATIONS_DEPARTURES,
    payload
  };
};

const setError = payload => {
  return {
    type: actionTypes.SET_ERROR,
    payload
  };
};

const updateDepartures = payload => {
  return {
    type: actionTypes.UPDATE_DEPARTURES,
    payload
  }
};

export const fetchData = ({url, params}) => {
  return {
    type: actionTypes.API,
    payload: {
      url,
      params,
      onSuccess: saveLocationAndDepartures,
      onFailure: setError
    }
  }
};

export const pollingData = (url, params, index) => {
  return {
    type: actionTypes.API,
    payload: {
      url: url.indexOf('/poll') < 0 ? url + '/poll': url,
      params: {
        ...params,
        index
      },
      delayTime: 2000,
      onSuccess: updateDepartures,
      onFailure: setError
    }
  }
};