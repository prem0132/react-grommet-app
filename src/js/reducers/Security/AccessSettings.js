import { ACCESSSETTINGS_LOAD, ACCESSSETTINGS_UNLOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
      HTTP: {},
      HTTPS: {},
      Oem: {
        Hpe: {
            RemoteConsole: {
                Port: undefined,
                ProtocolEnabled: undefined
            }
        }
      },
      VirtualMedia: {},
      Name: undefined
};

const handlers = {
  [ACCESSSETTINGS_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    //console.log("IsSecureShellChecked = ",action.payload.HTTP.ProtocolEnabled);
    if (!action.error) {
      action.payload.error = undefined;
      return {
        HTTP: {Port: action.payload.HTTP.Port,
              ProtocolEnabled: action.payload.HTTP.ProtocolEnabled},
        HTTPS: action.payload.HTTPS,
        Oem: action.payload.Oem,
        VirtualMedia: action.payload.VirtualMedia,
        Name: action.payload.Name
      };      
    }
    //TO DO: catch the actual error and display
    //console.log("error");
    return { error: action.payload };
    
  },



  [ACCESSSETTINGS_UNLOAD]: () => {
    ({ ...initialState})
  }
};

export default createReducer(initialState, handlers);
