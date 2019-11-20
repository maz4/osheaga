import * as actionTypes from '../constants/constants';

export const error = (state = false, action) => {
  switch(action.type){
    case actionTypes.SET_ERROR:
      return true;
    default: 
      return state;
  }
};
