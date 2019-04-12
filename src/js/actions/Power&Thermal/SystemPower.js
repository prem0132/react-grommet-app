import { COMPUTER_RESET, SYSTEMPOWER_LOAD_FAILURE, SYSTEMPOWER_LOAD, SYSTEMPOWER_UNLOAD } from '../../actions';
import {getItem, postItem, postItemEsc} from '../utils';

export function computerReset(ResetType) {
  
  const item = JSON.stringify({ResetType});
  
    return dispatch => {
        postItemEsc('/redfish/v1/Systems/1/Actions/ComputerSystem.Reset', item)
   .then(payload => {
       dispatch({type: COMPUTER_RESET, payload});
   })
   .catch(error => dispatch({ type: COMPUTER_RESET, error: true}))
  };
}

export function loadSysPower(){
    return dispatch => {
        //console.log("a");
        //getItem('10.251.237.79/redfish/v1/Chassis/1')
        getItem('/redfish/v1/Systems/1')
        .then(payload => dispatch({ type: SYSTEMPOWER_LOAD, payload: payload}))
        .catch(error => dispatch({ type: SYSTEMPOWER_LOAD_FAILURE, error:error}));
       };

}

export function unloadSysPower(){
    return dispatch => {
        dispatch({ type: SYSTEMPOWER_UNLOAD });
    }
    
}