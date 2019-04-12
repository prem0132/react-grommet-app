import {
  SESSION_LOAD, SESSION_LOGIN, SESSION_ARGS_UPDATE, SESSION_LOGOUT
} from '../actions';
import { createReducer } from './utils';
//import { updateHeadersEsc } from '../actions/utils';


//TO DO : retain data and initialize for a refresh
const initialState = {
  error: undefined,
  token: undefined,
  UserName: undefined,
  accountType:undefined
};

const stateForLogin = (action) => ({
  UserName: action.UserName,
  token: action['x-auth-token']
});

const handlers = {
  //TO DO : retain data and initialize for a refresh
  //[SESSION_INIT]: (_, action) => stateForLogin(action),
  [SESSION_LOAD]: (state, action) => {
    //updateHeadersEsc({'x-auth-token':action.payload.token});
    action.payload
  },
  [SESSION_LOGIN]: (state, action) => {
    if (!action.error) {      
      return action.payload;
    }
    return { error: action.payload.message };
  },
  [SESSION_ARGS_UPDATE]:(state, action) => {
    return ({
    UserName: action.sessionArgsUpdate.UserName,
    token: action.sessionArgsUpdate.token,
    accountType:action.sessionArgsUpdate.accountType
    
  })},
  [SESSION_LOGOUT]: () => initialState
};

export default createReducer(initialState, handlers);
