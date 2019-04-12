import {postKill} from '../utils';
import {KILL_SYSTEM, KILL_SYSTEM_UNLOAD, KILL_SYSTEM_LOAD} from '../index';

export function killAuthenticate(UserName, Password){
    const data = JSON.stringify({UserName, Password});
    //console.log(data);
    return dispatch => {
        postKill('/redfish/v1/Systems/1/Actions/Oem/Hpe/HpeSystem.Kill', data)
        .then((payload) => {
            dispatch({ type: KILL_SYSTEM, payload})
        })
        .catch(error => {
            dispatch({ type: KILL_SYSTEM, error})
        })
    };

}

export function loadKill(){//console.log('aciont loadKill');
    return dispatch => { type: KILL_SYSTEM_LOAD } ;
}


export function unloadKill() {
    //console.log('unload called')
    return { type: KILL_SYSTEM_UNLOAD };
   }
  