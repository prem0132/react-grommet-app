import { SYSSUMMARY_LOAD, SYSSUMMARY_UNLOAD, SYSSUMMARY_LOAD_FAILURE } from '../../actions';
import {getItem} from '../utils';

export function loadSysSummary() {

     return dispatch => {
   //getItem('10.251.237.79/redfish/v1/Chassis/1')
   getItem('/redfish/v1/Systems/1')
   .then(payload => dispatch(loadSysSummarySuccess(payload)))
   .catch(error => dispatch(loadSysSummaryFailure(error)))
  };
}


/*
    //console.log('calling api')
    return function(dispatch) {
    getItem('/redfish/v1/Managers/1/EthernetInterfaces/1/')
    .then(response => response.json())
    .then ((response) => {
      //console.log("Response = ",response)
            dispatch({ type: NETWORKSUMMARY_LOAD, payload: response });
          })
    .catch(error => //console.log(error));
  }
}
*/

export function unloadSysSummary() {
    //console.log('unload Summary called')

    return { type: SYSSUMMARY_UNLOAD };
   }


export function loadSysSummarySuccess(payload){
  //console.log('payload=',payload);
  return { type:SYSSUMMARY_LOAD, payload: payload };
}

export function loadSysSummaryFailure(error){
  return {type:SYSSUMMARY_LOAD_FAILURE, error: error};
}

/*
   return dispatch => {
   //getItem('10.251.237.79/redfish/v1/Chassis/1')
   getItem('/redfish/v1/Managers/1/EthernetInterfaces/1/')
   .then(payload => dispatch(loadDashboardSuccess(payload)))
   .catch(error => dispatch(loadDashboardFailure(error)))
  };
}

*/