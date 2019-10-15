import * as actionTypes from '../constants/constants';

const reducer = (state, action) => {
  switch(action.type){
    case actionTypes.SAVE_DATA: {
      return {
        busData: action.payload
      }
    }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: true,
        errorData: action.payload
      }
    default: 
      return state;
  }
} 

export default reducer;