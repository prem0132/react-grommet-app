import { TEMPERATURE_LOAD, TEMPERATURE_UNLOAD, TEMPERATURE_LOAD_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
	Temperatures: []
};

const handlers = {

  [TEMPERATURE_LOAD_FAILURE]: (state, action) => { 
    return ({...initialState})
  },

  [TEMPERATURE_LOAD]: (state, action) => {
    const Temperatures = [];
    //console.log("Action Reducers payload = ",action.payload.Temperatures);
    for(let i=0;i<action.payload.Temperatures.length;i++){
      Temperatures.push({
        SensorNumber: action.payload.Temperatures[i].SensorNumber,
        Name: action.payload.Temperatures[i].Name,
        State: action.payload.Temperatures[i].Status.State,
        Health: action.payload.Temperatures[i].Status.Health,
        ReadingCelsius: action.payload.Temperatures[i].ReadingCelsius,
        UpperThresholdFatal: action.payload.Temperatures[i].UpperThresholdFatal,
        UpperThresholdCritical: action.payload.Temperatures[i].UpperThresholdCritical,
    });

  }
  return { Temperatures };      
},




 
   


  [TEMPERATURE_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers); 