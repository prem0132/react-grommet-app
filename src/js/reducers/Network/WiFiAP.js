import { WIFIAP_LOAD, WIFIAP_UNLOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
    AccessPointEnabled: undefined
};

const handlers = {
  [WIFIAP_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return {AccessPointEnabled : action.payload.AccessPointEnabled};      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [WIFIAP_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);