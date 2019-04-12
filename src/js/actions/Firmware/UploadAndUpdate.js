import { REPO_LOAD, REPO_UNLOAD, REPO_LOAD_FAILURE } from '../../actions';
import {  patchItemEsc, postItemURIEsc,patchItemURIEsc,postItemFileEsc} from '../utils';
import {loadRepo,loadRepoFailure} from './Repo'

export function uploadSoftware(file) {
  

    return dispatch => {
      //console.log('upload soft1',file)
      let data = new FormData();
      data.append('file', file);
    //console.log('upload soft',data)
      patchItemEsc('/redfish/v1/UpdateService/SoftwareInventory/',data)
  
      .then (() => dispatch(loadRepo()))
      .catch(error => dispatch(loadRepoFailure(error)))
    };
  }

  export function uploadSoftwareURI(file) {
  

    return dispatch => {
      //console.log('uploadsoftwareURI',file)
      const data = JSON.stringify(file);
  
      /* let data = new FormData();
      data.append('ImageURI', file); */
    //console.log('upload soft',data)
    patchItemURIEsc('/redfish/v1/UpdateService/SoftwareInventory/',data)
  
      .then (() => dispatch(loadRepo()))
      .catch(error => dispatch(loadRepoFailure(error)))
    };
  }

  export function updateSoftware(file) {
  

    return dispatch => {
      //console.log('upload soft1',file)
      let data = new FormData();
      data.append('file', file);
    //console.log('upload soft',data)
    postItemFileEsc('/redfish/v1/UpdateService/uploadFile',data)
  
      .then (() =>{
        
         dispatch(loadRepo())
        })
      .catch(error => dispatch(loadRepoFailure(error)))
    };
  }

  export function updateSoftwareURI(file) {
  

    return dispatch => {
      //console.log('upload soft1',file)
      //console.log('uploadsoftwareURI',file)
      const data = JSON.stringify(file);
    //console.log('upload soft',data)
    postItemURIEsc('/redfish/v1/UpdateService/Actions/UpdateService.SimpleUpdate/',data)
  
      .then (() => {
        
        dispatch(loadRepo())})
      .catch(error => dispatch(loadRepoFailure(error)))
    };
  }