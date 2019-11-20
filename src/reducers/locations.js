import * as actionTypes from '../constants/constants';

export const locations = (state = [], action) => {
  switch(action.type){
    case actionTypes.SAVE_LOCATIONS_DEPARTURES:
      return action.payload.locations;
    default:
      return state;
  }
};