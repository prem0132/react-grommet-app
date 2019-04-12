import { SYSSUMMARY_LOAD, SYSSUMMARY_UNLOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
 //Oem: {},
 //Hpe: {},
 //Oem: {Hpe: {AggregateHealthStatus: {BiosOrHardwareHealth: {Status: {Health: undefined}},Memory: {Status: {Health: undefined}},Network: {Status: {Health: undefined}},PowerSupplies: {Status: {Health: undefined}},Temperatures: {Status: {Health: undefined}}}}}
 //BiosOrHardwareHealth: {Status: {Health: undefined}},
 //Memory: {Status: {Health: undefined}},
 //Network: {Status: {Health: undefined}},
 //PowerSupplies: {Status: {Health: undefined}},
 //Temperatures:{Status: {Health: undefined}} 
 BiosOrHardwareHealth: undefined,
 Memory: undefined,
 Network: undefined,
 PowerSupplies: undefined,
 Temperatures: undefined

};

const handlers = {
  [SYSSUMMARY_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      //action.payload.error = undefined;
      return {
        BiosOrHardwareHealth: action.payload.Oem.Hpe.AggregateHealthStatus.BiosOrHardwareHealth.Status.Health,
        Memory: action.payload.Oem.Hpe.AggregateHealthStatus.Memory.Status.Health,
        Network: action.payload.Oem.Hpe.AggregateHealthStatus.Network.Status.Health,
        PowerSupplies: action.payload.Oem.Hpe.AggregateHealthStatus.PowerSupplies.Status.Health,
        Temperatures: action.payload.Oem.Hpe.AggregateHealthStatus.Temperatures.Status.Health


      };      
    }
    //console.log("error");
    return { error: action.payload };
    
  },


  [SYSSUMMARY_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);