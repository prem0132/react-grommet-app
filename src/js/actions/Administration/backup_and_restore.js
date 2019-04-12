import {patchBackupRestore, patchRestore,getItem, postFactoryConfig } from '../utils';
import {BACKUP_AND_RESTORE_LOAD,BACKUP_AND_RESTORE_UNLOAD} from '../index';
import {FACTORY_DEFAULTS, BACKUP  } from '../index';


export function loadData(){
    return dispatch => {
        getItem('/redfish/v1/Managers/1')
        .then(payload => dispatch(loadOemDataSuccess(payload)))
        .catch(error => dispatch(loadOemDataFailure(error)))
  };
}

  function loadOemDataSuccess(payload) {
      return { type: BACKUP_AND_RESTORE_LOAD, payload: payload };
  }

  function loadOemDataFailure(error) {
      return{ type: BACKUP_AND_RESTORE_LOAD, error: error };
  }
export function backupConfig(settings){
    const data = JSON.stringify(settings);

    return dispatch =>{ (
        patchBackupRestore('/redfish/v1/Managers/1', data)
        .then((payload) =>  dispatch(backupSuccess(payload)))
        // dispatch(loadData())        
        .catch((error) => dispatch(backupFailed(error)))
        // dispatch(loadData()))
        )
    };
}

export function restoreConfig (settings){
    const data = JSON.stringify(settings);

    return dispatch => {(
        patchBackupRestore('/redfish/v1/Managers/1', data)
        .then(() =>           // dispatch(restoreSuccess())
            dispatch(loadData())
        )
        .catch(error => 
            // dispatch(restoreFailed())
            dispatch(loadData())
        )
    )
    };
}

function backupSuccess(payload) {
    return{ type:BACKUP, payload: payload};
}

function backupFailed(error)  {
    return{ type:BACKUP, error: error};
}

// restoreFailed() => {
//     return{ type: RESTORE_FAILED };
// }

// restoreSuccess() => {
//     return{ type: RESTORE_SUCCESS };
// }
export function unloadBackupandRestoreSummary() {
    return { type: BACKUP_AND_RESTORE_UNLOAD };
   }

export function factoryConfig(dataArg) {
const data = JSON.stringify(dataArg);

    return dispatch => {
        postFactoryConfig('/redfish/v1/Managers/1/Actions/Oem/Hpe/HpeiLO.ResetToFactoryDefaults/ ', data)
        .then(() => dispatch(successFactoryConfig()))
        .catch((error) => dispatch(failedFactoryConfig(error)))
    };
}

function failedFactoryConfig(error){
    return{ type:FACTORY_DEFAULTS, error: error};
}

function successFactoryConfig(){
    return{ type:FACTORY_DEFAULTS };
}

