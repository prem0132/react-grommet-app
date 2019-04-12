import { NETWORK_LOAD, NETWORK_UNLOAD, NETWORK_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
	networkarray: [],
};

const handlers = {

  [NETWORK_LOAD_FAILURE]: (state, action) => {
    return ({...initialState})
  },

  [NETWORK_LOAD]: (state, action) => {
    const networkarray = [];
   //console.log("Action payload = ",action.payload);
   for(let i=0;i<action.payload.Members.length;i++){
    networkarray.push({
      MACAddress: action.payload.Members[i].MACAddress
  });
}
    
    if (!action.error) {
      action.payload.error = undefined;
      return {networkarray};      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [NETWORK_UNLOAD]: (state, action) => {
    ({ ...initialState })
}
};

export default createReducer(initialState, handlers); 