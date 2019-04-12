import { BOOTORDER_LOAD, BOOTORDER_UNLOAD, BOOTORDER_LOAD_FAILURE } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';

export function loadbootorder() {
 //console.log('BOOTORDER_LOAD')
    return dispatch => {
   getItem('/redfish/v1/Systems/1/Bios/Boot')
   .then(payload => dispatch(loadbootorderSuccess(payload)))
   .catch(error => dispatch(loadbootorderFailure(error)))
  };
}


export function changebootorder(bootorder){
 //console.log('bootorder:',bootorder);
  const data = JSON.stringify(bootorder);
  //alert("wait")
  return dispatch => (
      patchNetworkGeneral('/redfish/v1/Systems/1/Bios/Boot', data)
      .then((payload) => {
          dispatch({ type: BOOTORDER_LOAD});
      })
      .catch(payload => {
        //console.log('error');
          dispatch({
              type: BOOTORDER_LOAD_FAILURE,
              error: true
          })
      })
  )

}

export function unloadbootorder() {
  //console.log('BOOTORDER_UNLOAD')
    return { type: BOOTORDER_UNLOAD };
   }


export function loadbootorderSuccess(payload){
  return { type:BOOTORDER_LOAD, payload: payload };
}

export function loadbootorderFailure(error){
  return {type:BOOTORDER_LOAD_FAILURE, error: error};
} 