import { LOGINSECURITYBANNER_LOAD, LOGINSECURITYBANNER_UNLOAD, LOGINSECURITYBANNER_LOAD_FAILURE } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';

export function loadloginsecuritybanner() {
  //console.log('LOGINSECURITYBANNER_LOAD')
    return dispatch => {
   getItem('/redfish/v1/Managers/1/LoginSecurityBanner')
   .then(payload => dispatch(loadloginsecuritybannerSuccess(payload)))
   .catch(error => dispatch(loadloginsecuritybannerFailure(error)))
  };
}


export function changeloginsecuritybanner(securitybanner){
  //console.log('security banner:',securitybanner.SecurityMessage,securitybanner.IsEnabled);
  const data = JSON.stringify(securitybanner);

  return dispatch => (
      patchNetworkGeneral('/redfish/v1/Managers/1/LoginSecurityBanner', data)
      .then((payload) => {
          dispatch({ type: LOGINSECURITYBANNER_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: LOGINSECURITYBANNER_LOAD_FAILURE,
              error: true
          })
      })
  )

}

export function unloadloginsecuritybanner() {
    //console.log('LOGINSECURITYBANNER_UNLOAD')
    return { type: LOGINSECURITYBANNER_UNLOAD };
   }


export function loadloginsecuritybannerSuccess(payload){
  return { type:LOGINSECURITYBANNER_LOAD, payload: payload };
}

export function loadloginsecuritybannerFailure(error){
  return {type:LOGINSECURITYBANNER_LOAD_FAILURE, error: error};
} 