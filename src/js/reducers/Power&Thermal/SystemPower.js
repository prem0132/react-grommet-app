import { COMPUTER_RESET, SYSTEMPOWER_LOAD, SYSTEMPOWER_LOAD_FAILURE, SYSTEMPOWER_UNLOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
//    colorIndex: undefined,//to indicate power status
    powerState: undefined,
    error: undefined
};

const handlers = {

//   [COMPUTER_RESET]: (state, action) => {
//     return ({...initialState})
//   },

  [COMPUTER_RESET]: (state, action) => {
    
    if (!action.error) {
      action.payload.error = undefined;
      return { resetStatus: action.payload.MessageId };     
    }
    //console.log("error");
    return { error: action.payload };
    
  },
  [SYSTEMPOWER_LOAD]: (state,action) => {
    if (!action.error) {
        action.payload.error = undefined;
        return { powerState: action.payload.PowerState };
    }
    return { error: action.payload };

  },
  [SYSTEMPOWER_LOAD_FAILURE]: (state,action) => {
    return { error: action.error };
      
},
[SYSTEMPOWER_UNLOAD]: (state,action) => {
    ({ ...initialState })
  }


 };

export default createReducer(initialState, handlers); 