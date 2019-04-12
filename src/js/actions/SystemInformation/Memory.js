import { MEMORY_LOAD, MEMORY_UNLOAD, MEMORY_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadMemory() {
  //console.log('MEMORY_LOAD')
     return dispatch => {
   getItem('/redfish/v1/Systems/1/Memory?expand=1')
   .then(payload => dispatch(loadMemorySuccess(payload)))
   .catch(error => dispatch(loadMemoryFailure(error)))
  };
}



export function unloadMemory() {
    //console.log('MEMORY_UNLOAD')
    return { type: MEMORY_UNLOAD };
   }


export function loadMemorySuccess(payload){
  //console.log('payload actions=',payload);
  return { type:MEMORY_LOAD, payload: payload };
}

export function loadMemoryFailure(error){
  //console.log('payload actions=error',payload);
  return {type:MEMORY_LOAD_FAILURE, error: error};
} 