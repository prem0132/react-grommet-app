import { LTE_LOAD, LTE_UNLOAD, LTE_LOAD_FAILURE } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';


export function changelte(ltesettings){
  //console.log('ltesettings:',ltesettings.APN,ltesettings.Enabled);
  const data = JSON.stringify(ltesettings);

  return dispatch => (
      patchNetworkGeneral('/redfish/v1/Managers/1/LteInterfaces/1/', data)
      .then((payload) => {
          dispatch({ type: LTE_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: LTE_LOAD_FAILURE,
              error: true
          })
      })
  )

}


export function loadLTE() {

     return dispatch => {
   getItem('/redfish/v1/Managers/1/LteInterfaces/1/')
   .then(payload => dispatch(loadLTESuccess(payload)))
   .catch(error => dispatch(loadLTEFailure(error)))
  };
}

export function unloadLTE() {
    //console.log('unload LTE called')
    return { type: LTE_UNLOAD };
   }


export function loadLTESuccess(payload){
  //console.log('payload=',payload);
  return { type:LTE_LOAD, payload: payload };
}

export function loadLTEFailure(error){
  return {type:LTE_LOAD_FAILURE, error: error};
}

