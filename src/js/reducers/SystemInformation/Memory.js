 import { MEMORY_LOAD, MEMORY_UNLOAD, MEMORY_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
	memoryarray: [],
};

const handlers = {
  [MEMORY_LOAD_FAILURE]: (state, action) => {
    return ({...initialState})
  },
  [MEMORY_LOAD]: (state, action) => {
    const memoryarray = [];
   //console.log("Action payload = ",action.payload);
   for(let i=0;i<action.payload.Members.length;i++){
    memoryarray.push({
      Id: action.payload.Members[i].Id,
      CapacityMiB: action.payload.Members[i].CapacityMiB,
      OperatingSpeedMHz: action.payload.Members[i].OperatingSpeedMHz,
      PartNumber: action.payload.Members[i].PartNumber
  });
}
    if (!action.error) {
      action.payload.error = undefined;
      return {memoryarray};      
    }
    //console.log("error");
    return { error: action.payload };
    
  },

  [MEMORY_UNLOAD]: (state, action) => {
    ({ ...initialState })
}
};



export default createReducer(initialState, handlers); 