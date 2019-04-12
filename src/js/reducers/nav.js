// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {
  NAV_ACTIVATE, NAV_ENABLE, NAV_RESPONSIVE
} from '../actions';

import { createReducer } from './utils';

const initialState = {
  active: true, // start with nav active
  enabled: true, // start with nav disabled
  responsive: 'multiple',
  items: [
    { path: '/dashboard', label: 'Information' },
    { path: '/system_information', label: 'System Information'},
    { path: '/firmware_OS', label: 'Firmware'},
    { path: '/remote_console', label: 'Remote Console'},
    { path: '/power_thermal', label: 'Power and Thermal'},
    { path: '/Wired & Wireless Network', label: 'Wired and Wireless Network'},
    { path: '/RemoteSupport', label: 'Remote Support'},
    { path: '/Administration', label: 'Administration'},
    { path: '/Security', label: 'Security'},
    //{ path: '/Management', label: 'Management'},Not required 
    { path: '/Option Cards', label: 'Option Cards'},
    //Oneview Not Required { path: '/HPEOneView', label: 'HPE OneView'},
  ]
};

const handlers = {
  [NAV_ACTIVATE]: (_, action) => (
    { active: action.active, activateOnMultiple: undefined }
  ),

  [NAV_ENABLE]: (_, action) => (
    { enabled: action.enabled }
  ),

  [NAV_RESPONSIVE]: (state, action) => {
    const result = { responsive: action.responsive };
    if (action.responsive === 'single' && state.active) {
      result.active = false;
      result.activateOnMultiple = true;
    } else if (action.responsive === 'multiple' && state.activateOnMultiple) {
      result.active = true;
    }
    return result;
  }
};

export default createReducer(initialState, handlers);
