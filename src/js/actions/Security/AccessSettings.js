import { ACCESSSETTINGS_LOAD, ACCESSSETTINGS_UNLOAD, ACCESSSETTINGS_LOAD_FAILURE } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';


export function changeaccesssettings(accesssettings){
    
  //console.log('data in change accesssettings',accesssettings);

  const data = JSON.stringify(accesssettings);

  return dispatch => (
      patchNetworkGeneral('/redfish/v1/Managers/1/NetworkProtocol', data)
      .then((payload) => {
          dispatch({ type: ACCESSSETTINGS_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: ACCESSSETTINGS_LOAD_FAILURE,
              error: true
          })
      })
  )

}


export function loadaccesssettings() {
  //console.log('ACCESSSETTINGS_LOAD')
    return dispatch => {
   getItem('/redfish/v1/Managers/1/NetworkProtocol')
   .then(payload => dispatch(loadaccesssettingsSuccess(payload)))
   .catch(error => dispatch(loadaccesssettingsFailure(error)))
  };
}



export function unloadaccesssettings() {
    //console.log('ACCESSSETTINGS_UNLOAD')
    return { type: ACCESSSETTINGS_UNLOAD };
   }


export function loadaccesssettingsSuccess(payload){
  return { type:ACCESSSETTINGS_LOAD, payload: payload };
}

export function loadaccesssettingsFailure(error){
  return {type:ACCESSSETTINGS_LOAD_FAILURE, error: error};
} 