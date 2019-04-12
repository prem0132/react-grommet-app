import { USERADMIN_LOAD,USERADMIN_LOAD_FAILURE, USERADMINEDIT_LOAD, USERADMIN_UNLOAD } from '../../actions';
import {getItem,postItemEsc,patchNetworkGeneral,deleteItem} from '../utils';


export function loadAdmin() {
//console.log('action id =',id);
  return dispatch => {
    getItem('/redfish/v1/AccountService/Accounts?expand=1')

    .then (payload => dispatch(loadAdminSuccess(payload)))
  //console.log('action uri count =',payload.Members.length);
  
  
   //console.log('action uri Firmware =', FwPayload)
    .catch(error => dispatch(loadAdminFailure(error)))
  };
}

export function AddUserAccount(UserData){
  //console.log(UserData);
  const data = JSON.stringify(UserData);

  return dispatch => (
    postItemEsc('/redfish/v1/AccountService/Accounts', UserData)
      .then((payload) => {
          dispatch({ type: USERADMIN_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: USERADMIN_LOAD_FAILURE,
              error: true
          })
      })
  )

}

export function deleteAccount(id) {
  
  
  return dispatch => {
    //console.log('delete soft1',id)
    deleteItem(`/redfish/v1/AccountService/Accounts/${id}`)  
    .then (() => {
      alert('Account has been deleted')
      dispatch(loadAdmin());
    })
    .catch(error => dispatch(loadAdminFailure(error)))
  };
}



export function EditUserAccount(UserData,id){
  //console.log('Edit',UserData,id);
  const data = JSON.stringify(UserData);

  return dispatch => (
    patchNetworkGeneral(`/redfish/v1/AccountService/Accounts/${id}`, data)
      .then((payload) => {
          dispatch({ type: USERADMIN_LOAD});
      })
      .catch(payload => {//console.log('error');
          dispatch({
              type: USERADMIN_LOAD_FAILURE,
              error: true
          })
      })
  )

}

export function loadAdminEdit(id){
  //console.log('load admin Edit entered',id);
  

  
    return dispatch => {
      getItem('/redfish/v1/AccountService/Accounts?expand=1')
  
      .then (payload => dispatch(loadAdminEditSuccess(payload,id)))
    //console.log('action uri count =',payload.Members.length);
    
    
     //console.log('action uri Firmware =', FwPayload)
      .catch(error => dispatch(loadAdminFailure(error)))
  
    }
}


export function loadAdminSuccess(payload){
  //console.log('payload actions=',payload);
  return { type:USERADMIN_LOAD,  payload};
}

export function loadAdminEditSuccess(payload,id){
  //console.log('payload actions=',payload);
  return { type:USERADMINEDIT_LOAD,  payload ,id};
}


export function loadAdminFailure(error){
  return {type:USERADMIN_LOAD_FAILURE, error: error};
}


export function unloadAdmin() {
  //console.log('unload called')
  return { type: USERADMIN_UNLOAD };
 }
