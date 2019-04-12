import { TEMPERATURE_LOAD, TEMPERATURE_UNLOAD, TEMPERATURE_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadSummary() {
  //console.log('TEMPERATURE_LOAD')
    return dispatch => {
   getItem('/redfish/v1/Chassis/1/Thermal/')
   .then(payload => dispatch(loadSummarySuccess(payload)))
   .catch(error => dispatch(loadSummaryFailure(error)))
  };
}



export function unloadSummary() {
    //console.log('TEMPERATURE_UNLOAD')
    return { type: TEMPERATURE_UNLOAD };
   }


export function loadSummarySuccess(payload){
  return { type:TEMPERATURE_LOAD, payload: payload };
}

export function loadSummaryFailure(error){
  return {type:TEMPERATURE_LOAD_FAILURE, error: error};
} 