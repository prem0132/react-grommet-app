import {  NETWORKSUMMARY_UNLOAD, NETWORKSUMMARY_LOAD, NETWORKGENERAL_ERROR } from '../../actions';
import {getItem, patchNetworkGeneral} from '../utils';


export function changeNetworkIPV4(networkSettings){
    
    //console.log('data in change network IPV4',networkSettings);

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