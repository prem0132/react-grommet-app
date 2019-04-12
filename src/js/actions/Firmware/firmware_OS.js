import { FIRMWARE_LOAD,FIRMWARE_LOAD_FAILURE, FIRMWARE_UNLOAD } from '../../actions';
import {getItem} from '../utils';


export function loadfirmware() {

  return dispatch => {
    getItem('/redfish/v1/UpdateService/FirmwareInventory?expand=1')

    .then (payload => dispatch(loadFirmwareSuccess(payload)))
  //console.log('action uri count =',payload.Members.length);
  
  
   //console.log('action uri Firmware =', FwPayload)
    .catch(error => dispatch(loadFirmwareFailure(error)))
  };
}


export function loadFirmwareSuccess(payload){
  //console.log('payload actions=',payload);
  return { type:FIRMWARE_LOAD,  payload };
}


export function loadFirmwareFailure(error){
  return {type:FIRMWARE_LOAD_FAILURE, error: error};
}


export function unloadfirmware() {
  //console.log('unload called')
  return { type: FIRMWARE_UNLOAD };
 }
