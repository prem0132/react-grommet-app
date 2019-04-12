import {SECURE_ERASE_SYSTEM, SECURE_ERASE_SYSTEM_UNLOAD, SECURE_ERASE_SYSTEM_LOAD} from '../../actions/index';
import {createReducer} from '../utils';

const initialState = {
    ESCsecureErase: undefined,
    error: undefined
}

const handlers ={
    [SECURE_ERASE_SYSTEM]: (state, action) => {
        if(!action.error) {
            return {
                ESCsecureErase: action.payload
            };

        }
        return { error: action.payload};
    },
    [SECURE_ERASE_SYSTEM_LOAD]: () => {//console.log('reducer unload');
        return { ESCsecureErase: false };
    },
    [SECURE_ERASE_SYSTEM_UNLOAD]: () => {//console.log('unload');
        ({...initialState})
    }
}