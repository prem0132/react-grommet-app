import { SESSIONLIST_LOAD, SESSIONLIST_UNLOAD, SESSIONLIST_FAILURE } from '../../actions';
import {getItem,deleteuris} from '../utils';

export function loadSessionList() {
    return dispatch => {
   getItem('/redfish/v1/SessionService/Sessions?expand=1')
   .then(payload => dispatch(loadSessionListSuccess(payload)))
   .catch(error => dispatch(loadSessionListFailure(error)))
  };
}

export function deletesession(uriarray) {
    return dispatch => {
      //console.log('uriarray in actions deletesession',uriarray)
      deleteuris(uriarray)  
      .then (() => {
        dispatch(loadSessionList());
      })
      .catch(error => dispatch(loadSessionListFailure(error)))
    };
  }

export function unloadSessionList() {
    //console.log('SESSIONLIST_UNLOAD')
    return { type: SESSIONLIST_UNLOAD };
   }


export function loadSessionListSuccess(payload){
  return { type:SESSIONLIST_LOAD, payload: payload };
}

export function loadSessionListFailure(error){
  return {type:SESSIONLIST_FAILURE, error: error};
} 