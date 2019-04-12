import {FACTORY_DEFAULTS, BACKUP, RESTORE, BACKUP_SUCCESS, BACKUP_FAILED, RESTORE_SUCCESS, RESTORE_FAILED, BACKUP_AND_RESTORE_LOAD, BACKUP_AND_RESTORE_UNLOAD} from '../../actions/index';
import { createReducer } from '../utils';

const initialState ={
    ESCConfigurationBackup: undefined,
    ESCConfigurationRestore: undefined,
    ESCFactoryRestore: undefined,
    backupError: undefined,
    restoreError: undefined,
    factoryRestoreError: undefined,
    error: undefined
}

const handlers = {
    [BACKUP_AND_RESTORE_LOAD]: (state, action) => {
        if(!action.error) {
            return{
                ESCConfigurationBackup: action.payload.Oem.Hpe.ESCConfigurationBackup,
                ESCConfigurationRestore: action.payload.Oem.Hpe.ESCConfigurationRestore
            };
        }
        return {error: action.payload };
    },
    [BACKUP]: (state, action) => {
        if(!action.error) {
            return{
                ESCConfigurationBackup: action.payload.Oem.Hpe.ESCConfigurationBackup
            };
        }
        return {
            backupError: action.payload
        }
    },
    [RESTORE]: (state, action) => {
        if(!action.error) {
            return{
                ESCConfigurationRestore: action.payload.Oem.Hpe.ESCConfigurationRestore
            };
        }
        return {
            restoreError: action.payload
        }
    },
    [FACTORY_DEFAULTS]: (state, action) => {
        if(!action.error) {
            return{
                ESCFactoryRestore: true
            };
        }
        return {
            ESCFactoryRestore: undefined,
            factoryRestoreError: action.error
        };
    },
    [BACKUP_AND_RESTORE_UNLOAD]: () => {
        ({...initialState})
    }
}

export default createReducer(initialState, handlers);