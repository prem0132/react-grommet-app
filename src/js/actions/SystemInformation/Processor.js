import { PROCESSOR_LOAD, PROCESSOR_UNLOAD, PROCESSOR_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadProcessor() {
  //console.log('PROCESSOR_LOAD')
     return dispatch => {
   getItem('/redfish/v1/Systems/1/Processors?expand=1')
   .then(payload => dispatch(loadProcessorSuccess(payload)))
   .catch(error => dispatch(loadProcessorFailure(error)))
  };
}



export function unloadProcessor() {
    //console.log('PROCESSOR_UNLOAD')
    return { type: PROCESSOR_UNLOAD };
   }


export function loadProcessorSuccess(payload){
  return { type:PROCESSOR_LOAD, payload: payload };
}

export function loadProcessorFailure(error){
  return {type:PROCESSOR_LOAD_FAILURE, error: error};
} 