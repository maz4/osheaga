import * as actionTypes from '../constants/constants';

const saveData = payload => {
  return {
    type: actionTypes.SAVE_DATA,
    payload
  };
};

const setFetchError = payload => {
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

export const fetchData = (params) => {
  return {
    type: actionTypes.API,
    payload: {
      params,
      onSuccess: saveData,
      onFail: setFetchError,
    }
  }
};

export const pollingData = params => {
  return {
    type: actionTypes.API,
    payload: {
      params,
      delayTime: 2000,
      onSuccess: updateDepartures,
      onFail: setFetchError
    }
  }
};