// This file serves for Network/Summary and Network/General and WIFi APN

import { NETWORKSUMMARY_LOAD, NETWORKSUMMARY_UNLOAD, NETWORKGENERAL_ERROR } from '../../actions';
import { createReducer } from '../utils';



const initialState = {
  MACAddress: undefined,
  HostName: undefined,
  FQDN: undefined,
  PermanentMACAddress: undefined,
  Name: undefined,
  IPv6AddressPolicyTable: {},
  IPv4Addresses: {},
  IPv6Addresses: [{}],
  IPv6DefaultGateway: undefined,
  IPv6StaticAddresses: [{}],
  FullDuplex: undefined,
  NameServers: [],
  SpeedMbps: undefined,
  IPV6clientprecendence: undefined,
  IPV6AddressOrigin: undefined,
  error: undefined,
  SSID: undefined,
  Security: undefined,
  Strength: undefined,
  Status: undefined,
  AccessPointEnabled: undefined,
  lteNetwork: undefined,
  lteStatus: undefined,
  lteAPN: undefined,
  lteEnabled: undefined
};

const handlers = {
  [NETWORKSUMMARY_LOAD]: (state, action) => {
    //console.log("Action payload = ",action.payload);
    if (!action.error) {
      action.payload.error = undefined;
      return {
        MACAddress:action.payload[0].MACAddress,
        HostName:action.payload[0].HostName,
        FQDN:action.payload[0].FQDN,
        PermanentMACAddress: action.payload[0].PermanentMACAddress,
        Name: action.payload[0].Name,
        IPv6AddressPolicyTable: action.payload[0].IPv6AddressPolicyTable,
        IPv4Addresses: action.payload[0].IPv4Addresses,
        IPv6Addresses: action.payload[0].IPv6Addresses[0],
        IPv6DefaultGateway: action.payload[0].IPv6DefaultGateway,
        FullDuplex: action.payload[0].FullDuplex,
        NameServers: action.payload[0].NameServers,
        SpeedMbps: action.payload[0].SpeedMbps ,
        IPV6clientprecendence: action.payload[0].IPv6AddressPolicyTable.Precedence,
        IPV6AddressOrigin: action.payload[0].Oem.Hpe.IPv6.AddressOrigin,
        IPv6StaticAddresses: action.payload[0].IPv6StaticAddresses,
        SSID: action.payload[1].WifiStatus.SSID,
        Security: action.payload[1].WifiStatus.Security,
        Strength: action.payload[1].WifiStatus.Strength,
        Status: action.payload[1].WifiStatus.Status,
        AccessPointEnabled: action.payload[1].WifiStatus.AccessPointEnabled,
        lteNetwork: action.payload[2].LteStatus.Network,
        lteEnabled: action.payload[2].Enabled,
        lteStatus: action.payload[2].LteStatus.Status,
        lteAPN: action.payload[2].APN
      };      
    }
    //TO DO: catch the actual error and display
    //console.log("error");
    return { error: action.payload };
    
  },

  [NETWORKGENERAL_ERROR]: (state, action) =>{
    if(action.error){
        return{error: action.payload};
    }
    
  },

  [NETWORKSUMMARY_UNLOAD]: () => {
    ({ ...initialState})
  }
};

export default createReducer(initialState, handlers);
