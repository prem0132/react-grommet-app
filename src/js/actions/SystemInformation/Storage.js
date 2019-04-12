 //TO DO: No storage tab this file need to be deleted
 import { STORAGE_LOAD, STORAGE_UNLOAD, STORAGE_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadSummary() {
  //console.log('STORAGE_LOAD')
     return dispatch => {
   getItem('/redfish/v1/Systems/1/UpdateService/StorageInventory')
   .then(payload => dispatch(loadSummarySuccess(payload)))
   .catch(error => dispatch(loadSummaryFailure(error)))
  };
}



export function unloadSummary() {
    //console.log('STORAGE_UNLOAD')
    return { type: STORAGE_UNLOAD };
   }


export function loadSummarySuccess(payload){
  return { type:STORAGE_LOAD, payload: payload };
}

export function loadSummaryFailure(error){
  return {type:STORAGE_LOAD_FAILURE, error: error};
} 