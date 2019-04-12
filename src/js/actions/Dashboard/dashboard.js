import { DASHBOARD_LOAD, DASHBOARD_UNLOAD, DASHBOARD_LOAD_FAILURE } from '../../actions';

import {getItem, getDataFromUris} from '../utils';

export function loadDashboard() {

  return dispatch => {
   //getItem('10.251.237.79/redfish/v1/Chassis/1')
   //getItem('/redfish/v1/Chassis/1')
   getDataFromUris('/redfish/v1/Chassis/1', '/redfish/v1/Systems/1','/redfish/v1/Managers/1/EthernetInterfaces/1/','/redfish/v1/UpdateService/FirmwareInventory/ESC/', '/redfish/v1/Managers/1/DateTime')
   //.then(payload => dispatch(loadDashboardSuccess(payload)))
   //.catch(error => dispatch(loadDashboardFailure(error)))
   .then((payload) => dispatch({ type: DASHBOARD_LOAD, payload }))
   .catch(error => dispatch({ type: DASHBOARD_LOAD_FAILURE, error}))
  };
}

export function loadDashboardSuccess(payload){
  //console.log('payload=',payload);
  return { type:DASHBOARD_LOAD, payload: payload };
}

export function loadDashboardFailure(error){
  return {type:DASHBOARD_LOAD_FAILURE, error: error};
}

export function unloadDashboard() {
  //unwatchDashboard();
  return { type: DASHBOARD_UNLOAD };
}
