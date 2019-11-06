import * as actionTypes from '../constants/constants';
import {store} from '../store/store';

const reducer = (state = store, action) => {
  switch(action.type){
    case actionTypes.SAVE_DATA: {
      console.log(action.payload);
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
    // case actionTypes.API:
    //   return {
    //     ...state,
    //   };
    default: 
      return state;
  }
};

export default reducer;