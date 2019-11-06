import * as actionTypes from '../constants/constants';

export const saveData = (data) => {
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

export const fetchData = (params) => {
  return {
    type: actionTypes.API,
    payload: params
  }


};