import {KILL_SYSTEM, KILL_SYSTEM_UNLOAD, KILL_SYSTEM_LOAD} from '../../actions/index';
import {createReducer} from '../utils';

const initialState = {
    ESCKill: undefined,
    error: undefined
}

const handlers ={
    [KILL_SYSTEM]: (state, action) => {
        if(!action.error) {
            return {
                ESCKill: action.payload
            };

        }
        return { error: action.payload};
    },
    [KILL_SYSTEM_LOAD]: () => {//console.log('reducer unload');
        return { ESCKill: false };
    },
    [KILL_SYSTEM_UNLOAD]: () => {//console.log('unload');
        ({...initialState})
    }
}