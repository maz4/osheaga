import * as actionTypes from '../constants/constants';
export const saveBusData = (data) => {
  return {
    type: actionTypes.SAVE_DATA,
    payload: data
  };
};

export const setFetchError = error => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error
  };
};