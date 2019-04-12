 //TO DO: No storage tab this file need to be deleted
 import { STORAGE_LOAD, STORAGE_UNLOAD, STORAGE_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
	Name: undefined,
};

const handlers = {
  [STORAGE_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [STORAGE_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers); 