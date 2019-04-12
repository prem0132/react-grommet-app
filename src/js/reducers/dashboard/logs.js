import { LOGS_LOAD, LOGS_UNLOAD, LOGS_LOAD_FAILURE }from '../../actions';
import { createReducer } from '../utils';

const initialState = {
  
  LogsInfoAr: []

};



const handlers = {
 

  [LOGS_LOAD]: (state, action) => {
    const LogsInfoAr = [];
    //console.log("Action Reducers payload = ",action.payload.Members);
    for(let i=action.payload.Members.length - 1; i >= 0; i--){
      //console.log("Action Reducers FW Name = ",action.payload[i].Name);
      //console.log("Action Reducers FW Name = ",action.payload[i].Version);
      //console.log("Action Reducers FW Name = ",action.payload[i].Oem.Hpe.DeviceContext);
      
      LogsInfoAr.push({
        Id: action.payload.Members[i].Id,
        Severity: action.payload.Members[i].Severity,
        Message: action.payload.Members[i].Message,
        time: action.payload.Members[i].Created
    });
          
    //console.log("Action Reducers payload 2 = ", LogsInfoAr );   
    //console.log("Action Reducers FW Info = ",firmwareInfoAr);
    }
      return { LogsInfoAr };      
  },

  [LOGS_LOAD_FAILURE]: (state, action) => initialState ,
  [LOGS_UNLOAD]: (state, action) => initialState
};
export default createReducer(initialState, handlers);