import {postKill} from '../utils';
import {SECURE_ERASE_SYSTEM, SECURE_ERASE_SYSTEM_UNLOAD, SECURE_ERASE_SYSTEM_LOAD} from '../index';

export function secureEraseAuthenticate(UserName, Password){
    const data = JSON.stringify({UserName, Password});
    //console.log(data);
    return dispatch => {
        postKill('/redfish/v1/Systems/1/Actions/Oem/Hpe/HpeSecure.Erase', data)
        .then((payload) => {
            dispatch({ type: SECURE_ERASE_SYSTEM, payload})
        })
        .catch(error => {
            dispatch({ type: SECURE_ERASE_SYSTEM, error})
        })
    };

}

// export function loadKill(){
//     return dispatch => { type: SECURE_ERASE_SYSTEM_LOAD } ;
// }


// export function unloadKill() {
//console.log('unload called')
//     return { type: SECURE_ERASE_SYSTEM_UNLOAD };
//    }
  