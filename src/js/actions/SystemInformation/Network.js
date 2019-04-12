import { NETWORK_LOAD, NETWORK_UNLOAD, NETWORK_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadNetwork() {
  //console.log('NETWORK_LOAD')
     return dispatch => {
   getItem('/redfish/v1/Systems/1/EthernetInterfaces?expand=1')
   .then(payload => dispatch(loadNetworkSuccess(payload)))
   .catch(error => dispatch(loadNetworkFailure(error)))
  };
}



export function unloadNetwork() {
    //console.log('NETWORK_UNLOAD')
    return { type: NETWORK_UNLOAD };
   }


export function loadNetworkSuccess(payload){
  return { type:NETWORK_LOAD, payload: payload };
}

export function loadNetworkFailure(error){
  return {type:NETWORK_LOAD_FAILURE, error: error};
} 