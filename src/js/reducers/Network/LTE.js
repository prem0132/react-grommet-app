import { LTE_LOAD, LTE_UNLOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
  APN: undefined,
  Enabled: undefined,
  IMEI: undefined,
  IMSI: undefined,
  IP: undefined
};

const handlers = {
  [LTE_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return { Enabled: action.payload.Enabled,
        APN: action.payload.APN,
        IMEI: action.payload.LteStatus.IMEI ,      
        IMSI: action.payload.LteStatus.IMSI ,
        IP: action.payload.LteStatus.IPv4.Address };      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [LTE_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
