import { LOGINSECURITYBANNER_LOAD, LOGINSECURITYBANNER_UNLOAD, LOGINSECURITYBANNER_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
  IsEnabled: undefined,
  SecurityMessage: undefined,
  DefaultSecurityMessage : undefined
};

const handlers = {

  [LOGINSECURITYBANNER_LOAD_FAILURE]: (state, action) => { 
    return ({...initialState})
  },

  [LOGINSECURITYBANNER_LOAD]: (state, action) => {
    //console.log("Action payload LOGINSECURITYBANNER_LOAD actions= ",action.payload);
    //console.log("action.payload.LoginSecurityBanner.SecurityMessage LOGINSECURITYBANNER_LOAD actions = ",action.payload.LoginSecurityBanner.SecurityMessage);
    if (!action.error) {
      action.payload.error = undefined;
      return {
        IsEnabled: action.payload.IsEnabled,
        SecurityMessage: action.payload.SecurityMessage,
        DefaultSecurityMessage: action.payload.DefaultSecurityMessage        
      };      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [LOGINSECURITYBANNER_UNLOAD]: () => {
    ({ ...initialState})
  }
 /*  [LOGINSECURITYBANNER_UNLOAD]: () => initialState this resets to initial state*/
}; 

export default createReducer(initialState, handlers); 