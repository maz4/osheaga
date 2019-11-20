import * as actionTypes from '../constants/constants';

export const complete = (state = false, action) =>{
  switch(action.type){
    case actionTypes.SAVE_LOCATIONS_DEPARTURES:
      return action.payload.complete;
    default:
      return state
  }
};