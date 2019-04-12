import { LOGS_LOAD, LOGS_UNLOAD, LOGS_LOAD_FAILURE } from '../../actions';
//import { watchDashboard, unwatchDashboard } from '../../api/dashboard';
import { getItem, postItemEsc } from '../utils';

export function LogsItemload() {

  return dispatch => {
  
   getItem('/redfish/v1/Managers/1/LogServices/EventLog/Entries?expand=1')
   
   .then((payload) => dispatch(loadLogsSuccess(payload)))
   .catch(error => dispatch(loadLogsFailure(error)))
  };
}

export function loadImageOsTypes(type) {
  return dispatch => {
    //console.log("load os image types",type.value)
    let uri;
    if ('eventlogs' === type.value) {
      uri = '/redfish/v1/Managers/1/LogServices/EventLog/Entries?expand=1';
    }else if('healthlogs' === type.value){
      uri = '/redfish/v1/Systems/1/LogServices/HealthLog/Entries?expand=1';
    }
    getItem(uri)
    .then((payload) => dispatch(loadLogsSuccess(payload)))
    .catch(error => dispatch(loadLogsFailure(error)))
  };

}

export function deletelogs(type){
  //const item = JSON.stringify({"Action":"LogService.ClearLog"});
  return dispatch => {
     //console.log(type.value)
    let uri;
    if ('eventlogs' === type.value) {
      uri = '/redfish/v1/Managers/1/LogServices/EventLog/Actions/LogService.ClearLog';
    }else if('healthlogs' === type.value){
      uri = '/redfish/v1/Systems/1/LogServices/HealthLog/Actions/LogService.ClearLog';
    }
  
    postItemEsc(uri)
    
    .then(() => dispatch(loadImageOsTypes(type)));
    
   };

}

export function loadLogsSuccess(payload){ 
  //console.log('payload=',payload);
  return { type:LOGS_LOAD, payload: payload };
}

export function loadLogsFailure(error){
  return {type:LOGS_LOAD_FAILURE, error: error};
}

export function LogsItemUnload() {
  //unwatchDashboard();
  return { type: LOGS_UNLOAD };
}



