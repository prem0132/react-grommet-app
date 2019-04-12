import { BOOTORDER_LOAD, BOOTORDER_UNLOAD, BOOTORDER_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
    DefaultBootOrder : []
};

const handlers = {

  [BOOTORDER_LOAD_FAILURE]: (state, action) => { 
    return ({...initialState})
  },

  [BOOTORDER_LOAD]: (state, action) => {
    //console.log("Action payload BOOTORDER_LOAD actions= ",action.payload);
    //console.log("action.payload.LoginSecurityBanner.SecurityMessage BOOTORDER_LOAD actions = ",action.payload.LoginSecurityBanner.SecurityMessage);
    if (!action.error) {
      action.payload.error = undefined;
      return {
        DefaultBootOrder: action.payload.DefaultBootOrder
        
      };      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [BOOTORDER_UNLOAD]: () => {
    ({ ...initialState})
  }
 /*  [BOOTORDER_UNLOAD]: () => initialState this resets to initial state*/
}; 

export default createReducer(initialState, handlers); 