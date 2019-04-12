
import { DASHBOARD_INITIAL_STATE, DASHBOARD_LOAD, DASHBOARD_UNLOAD, DASHBOARD_LOAD_FAILURE } from '../../actions/index';
import { createReducer } from '../utils';

const initialState = {
    error: undefined,
    //Information: [],
    
    Information: {
      Manufacturer: undefined,
      Model: undefined,
      Name: undefined,//product name
      OEM: {Firmware: {SystemProgrammableLogicDevice: {Current: {VersionString: undefined}}}},//cpld ver
      SerialNumber: undefined,
      //Product Id: undefined,
      ESC_Fw_Ver: undefined,
      IPv4: undefined,
      IPv6: undefined,
      HostName: undefined,
      DateTime: undefined,
      //CPLD_ver: undefined,
      //IRC: undefined,

    },
    ComEx: {
      BiosVersion: undefined, //ROMver
      Health: undefined, //system health
      //System power
      TPM_state: undefined,
      PowerState: undefined,
     // UUID: undefined
      //TPM status
      //TPM module type
      //System date and time
    }
  };
// const initialState ={
//   information: {Manufacturer: ""}
// }

  const handlers = {
    //[DASHBOARD_INITIAL_STATE]:(state,action) => (initialState),
    [DASHBOARD_LOAD_FAILURE]: (state, action) => {
    return ({...initialState})
  },
    [DASHBOARD_LOAD]: (state, action) => {
      //console.log(action.payload[4].DateTime, action.payload['4'].DateTime);
      return({
        Information:{
          Manufacturer: action.payload["0"].Manufacturer,
          Model: action.payload["0"].Model,
          OEM: action.payload["0"].OEM,
          SerialNumber: action.payload["0"].SerialNumber,
          HostName:action.payload["2"].HostName,
          IPv4:action.payload["2"].IPv4Addresses.Address,
          IPv6:action.payload["2"].IPv6Addresses[0].Address,
          ESC_Fw_Ver: action.payload["3"].Version,
          DateTime: action.payload["4"].DateTime
        },
        ComEx:{
          BiosVersion: action.payload[1].BiosVersion,
          Health: action.payload[1].Status.Health,
          TPM_state: action.payload[1].TrustedModules["0"].Status.State,
          PowerState: action.payload[1].PowerState,
          //UUID: action.payload[1].UUID
        }
      })
      
      
      // return ({Manufacturer: action.payload["0"].Manufacturer,
      // Model: action.payload["0"].Model,
      // Oem: action.payload["0"].OEM,
      // SerialNumber: action.payload["0"].SerialNumber,
      // BiosVersion: action.payload[1].BiosVersion,
      // Health: action.payload[1].Status.Health,
      // TPM_state: action.payload[1].TrustedModules["0"].Status.State})



      //console.log("reducer action1=", action.payload, action.payload.Manufacturer, action.payload.Model);
      //   if (!action.error) {

      //   }
          
          

      //     // let Information = action.payload.map((i) => {
      //     //   return { Manufacturer: i.Manufacturer, Model: i.Model, Name: i.Name, 
      //     //   OEM: i.OEM, SerialNumber: i.SerialNumber}});
      //console.log("info=",Information);
      //     // return { Information: Information };


            
      //console.log("reducer action2=");
      //       //   Information.Manufacturer: action.payload["0"].Manufacturer;
      //console.log("reducer action3=",Manufacturer);
      //       //   ComEx.BiosVersion= action.payload[1].BiosVersion;
      //console.log("reducer action4=", Information, ComEx);
      //       //return action.payload;
      //   //})
      //     else{
            
      //       return {error:action.payload};
      //     }
          
          //return { error: action.payload };
        },
    [DASHBOARD_UNLOAD]: (state, action) => {
      ({ ...initialState })
    }

    //   [DASHBOARD_LOAD] : (state, action) => ({
    //     Model: 'HPE',
    //     Id: 'edgeline'
    //   }),

    //   [OVERVIEW_LOAD_FAILURE] : (state, action) => ({

    //   })
  };


export default createReducer(initialState, handlers);

//   export default function dashboardReducer (state = initialState, action) {
//     let handler = handlers[action.type];
//console.log("state reducer=",state)
//     if (!handler) return state;
//     return { ...state, ...handler(state, action) };
//   }