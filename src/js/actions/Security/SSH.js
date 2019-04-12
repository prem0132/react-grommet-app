import { SSH_LOAD,SSH_LOAD_FAILURE,SSH_UNLOAD } from '../../actions';
import {getItem,postItemEsc,patchNetworkGeneral,deleteItem} from '../utils';


export function loadSSHData() {
//console.log('action id =',id);
  return dispatch => {
    getItem('/redfish/v1/AccountService/Accounts?expand=1')

    .then (payload => dispatch(loadSSHSuccess(payload)))
  //console.log('action uri count =',payload.Members.length);
  
  
   //console.log('action uri Firmware =', FwPayload)
    .catch(error => dispatch(loadSSHFailure(error)))
  };
}

 export function AddnewKey(UserData,id){
  //console.log(UserData);
  const data = JSON.stringify(UserData);
  

  return dispatch => {
    postItemEsc(`/redfish/v1/AccountService/Accounts/${id}/Actions/ManagerAccount.AddSshKey`, UserData)
      .then(() => {
        alert('SSH Key has been added')
        dispatch(loadSSHData());
      })
      .catch(error => //dispatch(loadSSHFailure(error))
    alert('AddSSHKey Error'))
    }

} 

export function DeleteSSHKey(UserData,id){
  //console.log(UserData);
  const data = JSON.stringify(UserData);
  

  return dispatch => {
    postItemEsc(`/redfish/v1/AccountService/Accounts/${id}/Actions/ManagerAccount.DeleteSshKey`, UserData)
      .then(() => {
        alert('SSH Key has been deleted')
        dispatch(loadSSHData());
      })
      .catch(error => //dispatch(loadSSHFailure(error))
    alert('Delete SSH key Error'))
    }

} 





export function loadSSHSuccess(payload){
  //console.log('payload actions=',payload);
  return { type:SSH_LOAD,  payload:payload};
}




export function loadSSHFailure(error){
  return {type:SSH_LOAD_FAILURE, error: error};
}


export function unloadSSH() {
  //console.log('unload called')
  return { type: SSH_UNLOAD };
 }
