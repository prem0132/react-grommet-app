import { DEVICEINVENTORY_LOAD, DEVICEINVENTORY_UNLOAD, DEVICEINVENTORY_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
  PCIDevices: [],
  USBDevices:[]
};

const handlers = {

  [DEVICEINVENTORY_LOAD_FAILURE]: (state, action) => {
    return ({...initialState})
  },

  [DEVICEINVENTORY_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return {
        PCIDevices:action.payload.Oem.Hpe.PCIDevices,
        USBDevices:action.payload.Oem.Hpe.USBDevices,
         
      
      };     
    }
    return { error: action.payload };
    
  },


[DEVICEINVENTORY_UNLOAD]: (state, action) => {
  ({ ...initialState })
}
};

export default createReducer(initialState, handlers);