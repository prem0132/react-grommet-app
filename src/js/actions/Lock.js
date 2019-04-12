import {LOCKED_LOAD} from '../actions';

import {patchNetworkGeneral } from './utils';




export function lock(LockInput) {
    //console.log('lock',LockInput)
    const data = JSON.stringify(LockInput);
    return (dispatch) => {
      patchNetworkGeneral('/redfish/v1/Managers/1', LockInput)
      .then((payload) => {
        dispatch({ type: LOCKED_LOAD, payload})
    })
    .catch(error => {
        dispatch({ type: LOCKED_LOAD, error})
    })
  };
}





