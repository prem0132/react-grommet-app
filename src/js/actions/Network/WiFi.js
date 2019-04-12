import { WIFI_LOAD, WIFI_UNLOAD, WIFI_LOAD_FAILURE, WIFICONFIGURED_LOAD } from '../../actions';
import {getItem,patchNetworkGeneral,postItemEsc,deleteItem } from '../utils';


export function changewificonfig(wifiSettings,index){
    
  //console.log('data in change changewificonfig',wifiSettings,'match index',index);
  //alert('change wifi settings')
  const data = JSON.stringify(wifiSettings);
  //console.log('data', data)
  if(index == undefined){
    //alert('no match doing post')
    return dispatch => (
      postItemEsc('/redfish/v1/Managers/1/WifiInterfaces/1/ConfiguredWifiNetworks/', data)
      .then((payload) => {
          dispatch({ type: WIFICONFIGURED_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: WIFI_LOAD_FAILURE,
              error: true
          })
      })
  )
  }
  else{
    
    //alert('match found patch')
  return dispatch => (
      patchNetworkGeneral(`/redfish/v1/Managers/1/WifiInterfaces/1/ConfiguredWifiNetworks/${index}`, data)
      .then((payload) => {
          dispatch({ type: WIFICONFIGURED_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: WIFI_LOAD_FAILURE,
              error: true
          })
      })
  )
  }
}

export function deleteconfiguredwifi(index) {
  
  
  return dispatch => {
    //console.log('deleting uri',index)
    deleteItem(`/redfish/v1/Managers/1/WifiInterfaces/1/ConfiguredWifiNetworks/${index}`)  
    .then (() => {
      //alert('File has been deleted')
      dispatch(loadconfiguredwifi());
    })
    .catch(error => dispatch(loadWiFiFailure(error)))
  };
}

export function loadWiFi() {

     return dispatch => {
   getItem('/redfish/v1/Managers/1/EthernetInterfaces/1/')
   .then(payload => dispatch(loadWiFiSuccess(payload)))
   .catch(error => dispatch(loadWiFiFailure(error)))
  };
}

export function loadconfiguredwifi() {
  //console.log('loadconfiguredwifi actions');
  return dispatch => {
getItem('/redfish/v1/Managers/1/WifiInterfaces/1/ConfiguredWifiNetworks?expand=1')
.then(payload => dispatch(loadconfiguredwifiSuccess(payload)))
.catch(error => dispatch(loadWiFiFailure(error)))
};
}

export function loadconfiguredwifiSuccess(payload){
  //console.log('payload=',payload);
  return { type:WIFICONFIGURED_LOAD, payload: payload };
}

export function unloadWiFi() {
    //console.log('unload WiFi called')

    return { type: WIFI_UNLOAD };
   }


export function loadWiFiSuccess(payload){
  //console.log('payload=',payload);
  return { type:WIFI_LOAD, payload: payload };
}

export function loadWiFiFailure(error){
  return {type:WIFI_LOAD_FAILURE, error: error};
}

