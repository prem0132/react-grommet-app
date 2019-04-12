import { NETWORKSUMMARY_LOAD, NETWORKSUMMARY_UNLOAD, NETWORKSUMMARY_LOAD_FAILURE } from '../../actions';
import {getDataFromUris} from '../utils';

export function loadSummary() {

  return dispatch => {
    getDataFromUris('/redfish/v1/Managers/1/EthernetInterfaces/1/','/redfish/v1/Managers/1/WifiInterfaces/1/','/redfish/v1/Managers/1/LteInterfaces/1/')
   .then(payload => dispatch(loadSummarySuccess(payload)))
   .catch(error => dispatch(loadSummaryFailure(error)))
  };
}



export function unloadSummary() {
    //console.log('unload Summary called')

    return { type: NETWORKSUMMARY_UNLOAD };
   }


export function loadSummarySuccess(payload){
  //console.log('payload=',payload);
  return { type:NETWORKSUMMARY_LOAD, payload: payload };
}

export function loadSummaryFailure(error){
  return {type:NETWORKSUMMARY_LOAD_FAILURE, error: error};
}

