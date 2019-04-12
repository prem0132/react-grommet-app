import { DEVICEINVENTORY_LOAD, DEVICEINVENTORY_UNLOAD, DEVICEINVENTORY_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadDevices() {
  //console.log('DEVICEINVENTORY_LOAD')
     return dispatch => {
   getItem('/redfish/v1/Systems/1')
   .then(payload => dispatch(loadDevicesSuccess(payload)))
   .catch(error => dispatch(loadDevicesFailure(error)))
  };
}



export function unloadDevices() {
    //console.log('DEVICEINVENTORY_UNLOAD')
    return { type: DEVICEINVENTORY_UNLOAD };
   }


export function loadDevicesSuccess(payload){
  return { type:DEVICEINVENTORY_LOAD, payload: payload };
}

export function loadDevicesFailure(error){
  return {type:DEVICEINVENTORY_LOAD_FAILURE, error: error};
}