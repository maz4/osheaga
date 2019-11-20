import * as actionTypes from '../constants/constants';

export const departures = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SAVE_LOCATIONS_DEPARTURES:
      return action.payload.departures;
    case actionTypes.UPDATE_DEPARTURES:
      return [
        ...state,
        ...action.payload.departures
      ];
    default:
      return state;
  }
};