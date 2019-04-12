import { FIRMWARE_LOAD, FIRMWARE_UNLOAD,FIRMWARE_LOAD_FAILURE }from '../../actions';
import { createReducer } from '../utils';

const initialState = {
  
  firmwareInfoAr: []
};

// const stateForFirmware = (action) => ({
//     Name: action.payload[i].Name,
//     Version: action.payload[i].Version,
//     DeviceContext: action.payload[i].Oem.Hpe.DeviceContext
// });

const handlers = {
 
  [FIRMWARE_LOAD_FAILURE]: (state, action) => {
  return ({...initialState})
},
  [FIRMWARE_LOAD]: (state, action) => {
    const firmwareInfoAr = [];
    //console.log("Action Reducers payload = ",action.payload.length);
    for(let i=0;i<action.payload.Members.length;i++){
      //console.log("Action Reducers FW Name = ",action.payload[i].Name);
      //console.log("Action Reducers FW Name = ",action.payload[i].Version);
      //console.log("Action Reducers FW Name = ",action.payload[i].Oem.Hpe.DeviceContext);
      
      firmwareInfoAr.push({
        Name: action.payload.Members[i].Name,
        Version: action.payload.Members[i].Version,
        DeviceContext: action.payload.Members[i].Description
    });
          
    //console.log("Action Reducers payload  = ", firmwareInfoAr );   
    //console.log("Action Reducers FW Info = ",firmwareInfoAr);
    }
      return{firmwareInfoAr};      
  },
  [FIRMWARE_UNLOAD]: (state, action) => {
    ({ ...initialState })
}
};
export default createReducer(initialState, handlers);
