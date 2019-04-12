import { PROCESSOR_LOAD, PROCESSOR_UNLOAD, PROCESSOR_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
	processorarray: [],
};

const handlers = {

  [PROCESSOR_LOAD_FAILURE]: (state, action) => {
    return ({...initialState})
  },

  [PROCESSOR_LOAD]: (state, action) => {
    const processorarray = [];
    //console.log("Action payload = ",action.payload);

    for(let i=0;i<action.payload.Members.length;i++){
    processorarray.push({
      Model: action.payload.Members[i].Model,
      MaxSpeedMHz: action.payload.Members[i].MaxSpeedMHz,
      Id: action.payload.Members[i].Id,
      TotalCores: action.payload.Members[i].TotalCores,
      TotalThreads: action.payload.Members[i].TotalThreads,
      CoresEnabled: action.payload.Members[i].Oem.Hpe.CoresEnabled,
      Cache: action.payload.Members[i].Oem.Hpe.Cache
  });
}
    if (!action.error) {
      action.payload.error = undefined;
      //console.log('processorarray',processorarray)
      return {processorarray};
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [PROCESSOR_UNLOAD]: (state, action) => {
    ({ ...initialState })
}
};

export default createReducer(initialState, handlers); 