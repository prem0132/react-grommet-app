import { WIFIAP_LOAD, WIFIAP_UNLOAD, WIFIAP_LOAD_FAILURE } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';


export function changewifiapn(wifiapnsettings){
  //console.log('wifiapnsettingsings:',wifiapnsettings.AccessPointEnabled);
  const data = JSON.stringify(wifiapnsettings);

  return dispatch => (
      patchNetworkGeneral('/redfish/v1/Managers/1/WifiInterfaces/1', data)
      .then((payload) => {
          dispatch({ type: WIFIAP_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: WIFIAP_LOAD_FAILURE,
              error: true
          })
      })
  )

}


export function loadWiFiAP() {

     return dispatch => {
   getItem('/redfish/v1/Managers/1/WifiInterfaces/1')
   .then(payload => dispatch(loadWiFiAPSuccess(payload)))
   .catch(error => dispatch(loadWiFiAPFailure(error)))
  };
}

export function unloadWiFiAP() {
    //console.log('unload WiFiAP called')
    return { type: WIFIAP_UNLOAD };
   }


export function loadWiFiAPSuccess(payload){
  //console.log('payload=',payload);
  return { type:WIFIAP_LOAD, payload: payload };
}

export function loadWiFiAPFailure(error){
  return {type:WIFIAP_LOAD_FAILURE, error: error};
}

