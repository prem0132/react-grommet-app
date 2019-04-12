import {  NETWORKSUMMARY_UNLOAD, NETWORKSUMMARY_LOAD, NETWORKGENERAL_ERROR } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';

// export function unloadGeneral() {
//console.log('unload General called')

//     return { type: NETWORKSUMMARY_UNLOAD };
//    }

export function changeNetworkGeneral(networkSettings){//console.log(networkSettings);
    const data = JSON.stringify(networkSettings);

    return dispatch => (
        patchNetworkGeneral('/redfish/v1/Managers/1/EthernetInterfaces/1', data)
        .then((payload) => {
            dispatch({ type: NETWORKSUMMARY_LOAD});
        })
        .catch(payload => {//console.log('error');
            dispatch({
                type: NETWORKGENERAL_ERROR,
                error: true
            })
        })
    )

  }
// export function loadSummarySuccess(payload){
//console.log('payload=',payload);
//   return { type:NETWORKSUMMARY_LOAD, payload: payload };
// }

// export function loadSummaryFailure(error){
//   return {type:NETWORKSUMMARY_LOAD_FAILURE, error: error};
// }

// /*
//    return dispatch => {
//    //getItem('10.251.237.79/redfish/v1/Chassis/1')
//    getItem('/redfish/v1/Managers/1/EthernetInterfaces/1/')
//    .then(payload => dispatch(loadDashboardSuccess(payload)))
//    .catch(error => dispatch(loadDashboardFailure(error)))
//   };
// }

// */