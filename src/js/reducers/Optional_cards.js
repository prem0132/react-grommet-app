import { OPTIONALCARDS_LOAD, OPTIONALCARDS_UNLOAD, OPTIONALCARDS_LOAD_FAILURE } from '../actions';
import { createReducer } from './utils';

const initialState = {
    CanBus: {},
    DetectedType: undefined,
    DigitalIO : {},
    SerialPort: {}
};

const handlers = {

  [OPTIONALCARDS_LOAD_FAILURE]: (state, action) => { 
    return ({...initialState})
  },

  [OPTIONALCARDS_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    //console.log("Action  ",action);
    //console.log("state = ",state);
    if (!action.error) {
      action.payload.error = undefined;
      return {
        CanBus: action.payload.CanBus,
        DetectedType: action.payload.DetectedType,
        DigitalIO: action.payload.DigitalIO,     
        SerialPort: action.payload.SerialPort      
      };      
    }
    //console.log("erroR");
    return { error: action.payload };
    
  },


  [OPTIONALCARDS_UNLOAD]: () => {
    ({ ...initialState})
  }
                /*  [OPTIONALCARDS_UNLOAD]: () => initialState this resets to initial state*/
}; 

export default createReducer(initialState, handlers); 