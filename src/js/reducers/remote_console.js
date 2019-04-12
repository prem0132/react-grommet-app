import { REMOTE_CONSOLE_LOAD, REMOTE_CONSOLE_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  tasks: []
};

const handlers = {
  [REMOTE_CONSOLE_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [REMOTE_CONSOLE_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);