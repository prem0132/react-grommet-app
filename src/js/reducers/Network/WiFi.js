import { WIFI_LOAD, WIFI_UNLOAD, WIFICONFIGURED_LOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
  configuredwifiarray: []
};

const handlers = {
  [WIFI_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return {payload: action.payload};      
    }
    //console.log("error");
    return { error: action.payload };
    
  },

  [WIFICONFIGURED_LOAD]: (state, action) => {
    const configuredwifiarray = [];

    for(let i=0;i<action.payload.Members.length;i++){
      configuredwifiarray.push({
        AnonymousIdentity: action.payload.Members[i].AnonymousIdentity,
        CACertFile: action.payload.Members[i].CACertFile,
        Description: action.payload.Members[i].Description,
        EAP: action.payload.Members[i].EAP,
        Enabled: action.payload.Members[i].Enabled,
        Hidden: action.payload.Members[i].Hidden,
        Identity: action.payload.Members[i].Identity,
        Passphrase: action.payload.Members[i].Passphrase,
        Phase2: action.payload.Members[i].Phase2,
        PrivateKeyFile: action.payload.Members[i].PrivateKeyFile,
        PrivateKeyPassphrase: action.payload.Members[i].PrivateKeyPassphrase,
        SSID: action.payload.Members[i].SSID,
        Security: action.payload.Members[i].Security,
        ID: action.payload.Members[i].ID,
      });
    }
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return {configuredwifiarray};      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


 // [WIFI_UNLOAD]: () => initialState

 [WIFI_UNLOAD]: () => {
  ({ ...initialState})
}
};

export default createReducer(initialState, handlers);