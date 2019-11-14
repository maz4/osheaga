import * as actionTypes from '../constants/constants';
import {store} from '../store/store';

const reducer = (state = store, action) => {
  switch(action.type){
    case actionTypes.SAVE_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: true,
        errorData: action.payload
      };
    case actionTypes.UPDATE_DEPARTURES:
      return {
        ...state,
        ...action.payload
      };
    default: 
      return state;
  }
};

export default reducer;