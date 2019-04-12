import { combineReducers } from 'redux';

import dashboard from './dashboard';
import nav from './nav';
import session from './session';
import tasks from './tasks';
import informationNav from './informationNav'
import firmware_OS from './Firmware/firmware_OS';
import repo from './Firmware/repo';
import Sys_Summary from './SystemInformation/Sys_Summary';
import network from './Network/Summary';
//import power from "./Power&Thermal/PowerandThermal";
import Temperature from "./Power&Thermal/Temperature";
import DeviceInventory from "./SystemInformation/DeviceInventory";
import Storage from "./SystemInformation/Storage";
import Network from "./SystemInformation/Network";
import Memory from "./SystemInformation/Memory";
import Processor from "./SystemInformation/Processor";
import dashboardReducer from './dashboard/overview';
import logs from './dashboard/logs';
import SystemPower from './Power&Thermal/SystemPower';
import loginsecuritybanner from './Security/LoginSecurityBanner';
import accesssettings from './Security/AccessSettings'
import BootOrder from './Administration/BootOrder';
import lte from './Network/LTE';
import wifiap from './Network/WiFiAP'
import wifi from './Network/WiFi'
import Useradmin from './Administration/UserAdmin';
import optionalcards from './Optional_cards';
import SSH from './Security/SSH';
import BackupandRestore from './Administration/backup_and_restore';
import Kill from './Administration/kill';
import certificate from './Security/sslCertificate';
import lock from './Lock';
import sessionListReducer from './dashboard/session_list';


const allReducers = combineReducers({
    lock,
    SSH,
    BootOrder,
    optionalcards,
    Useradmin,
    wifi,
    lte,
    wifiap,
    loginsecuritybanner,
    accesssettings,
    Temperature,
    Processor,
    Memory,
	Network,
    Storage,
	DeviceInventory,
    //power,
    Sys_Summary,
    dashboard,
    nav,
    session,
    //tasks, need to delete file
    informationNav,
    firmware_OS,
    repo,
	network,
    dashboardReducer,
    logs,
    SystemPower,
    BackupandRestore,
    Kill,
    certificate,
	sessionListReducer
})


export default allReducers;
