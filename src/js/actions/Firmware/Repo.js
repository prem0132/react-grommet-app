import { REPO_LOAD, REPO_UNLOAD, REPO_LOAD_FAILURE } from '../../actions';
import { getItem , getDataFromUris , patchItemEsc, deleteItem,postItemURIEsc,deleteuris} from '../utils';


export function loadRepo() {

  return dispatch => {
    getDataFromUris('/redfish/v1/UpdateService','/redfish/v1/UpdateService/SoftwareInventory?expand=1')

    .then (payload => dispatch(loadRepoSuccess(payload)))
    .catch(error => dispatch(loadRepoFailure(error)))
  };
}



export function deleteAllRepoComponent(comparray) {
  
  
  return dispatch => {
   //console.log('delete',comparray)
    //deleteuris(`/redfish/v1/UpdateService/SoftwareInventory/${fileName}`)  
    deleteuris(comparray)  
    .then (() => {
      //alert('File has been deleted')
      dispatch(loadRepo());
    })
    .catch(error => dispatch(loadRepoFailure(error)))
  };
}


export function deleteRepoComponent(fileName) {
  
  
  return dispatch => {
   //console.log('delete soft1',fileName)
    deleteItem(`/redfish/v1/UpdateService/SoftwareInventory/${fileName}`)  
    .then (() => {
      //alert('File has been deleted')
      dispatch(loadRepo());
    })
    .catch(error => dispatch(loadRepoFailure(error)))
  };
}



export function loadRepoSuccess(payload){
  //console.log('payload actions=',payload);
  return { type:REPO_LOAD,  payload };
}


export function loadRepoFailure(error){
  return { type:REPO_LOAD_FAILURE, error: error };
}


export function unloadRepo() {
  //console.log('unload called')
  return { type: REPO_UNLOAD };
 }
