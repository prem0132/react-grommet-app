
import {LOCKED_LOAD} from '../actions';
import { createReducer } from './utils';

const initialState = {
    Locked: undefined,
    error: undefined
}

const handlers ={
    [LOCKED_LOAD]: (state, action) => {
        if(!action.error) {
            //console.log('lock reducer',action.payload.Oem.Hpe.Locked) 
            return {
                Locked: action.payload.Oem.Hpe.Locked
            };

        }
        return { error: action.payload};
    }
}

export default createReducer(initialState, handlers);
   