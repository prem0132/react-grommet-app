import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {loadDashboard, unloadDashboard} from '../../actions/Dashboard/dashboard'

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import TableRow from 'grommet/components/TableRow';
import Table from 'grommet/components/Table';

import { pageLoaded } from '../utils';
import store from '../../store';

  class Overview extends Component {
    componentDidMount() {
        pageLoaded('Overview');
        this.props.dispatch(loadDashboard());
    
        // Rest.get('http://10.251.237.79/redfish/v1/Chassis/1').end((err, res) => {
        //   alert(res);
        //console.log(err);
        //});
        
      }

      componentWillUnmount() {
        this.props.dispatch(unloadDashboard());
      }
    
    render() {
        const {Information, ComEx} = this.props;
        //console.log('screens',Information);
        //console.log('state=', store.getState(), this.state, this.props);
       // this.props.dispatch(loadDashboard());
        //console.log("this.props=",this.props);
        const {Id, Manufacturer, Model, Name} =this.props;
        //console.log("data=",Id, Manufacturer, Model, Name);
        //console.log("this.props.Id=",this.props.Id);
        const EscOverviewItems = [
           // {key: 'Server Name' , value: ''},
            //{key: 'Product Name' , value: ''},
            {key: 'Serial Number' , value: Information.SerialNumber},
            {key: 'Model' , value: Information.Model},
            {key: 'Manufacturer' , value: Information.Manufacturer},

            {key: 'Product ID' , value: ''},
            {key: ' FW Version' , value: Information.ESC_Fw_Ver},
            {key: ' IPV4' , value: Information.IPv4},
            {key: ' IPV6' , value: Information.IPv6},
            {key: ' Host Name' , value: Information.HostName},
            //{key: 'UUID' , value: Information.UUID},
            {key: 'CPLD Version' , value: Information.OEM.Firmware.SystemProgrammableLogicDevice.Current.VersionString},
            {key: 'System Date & Time', value: Information.DateTime}
            // {key: 'IRC' , value: ''}, TO DO
           // {key: 'License Type' , value: ''}
          ]
        const hostOverviewItems = [
            {key: 'ROM Version', value: ComEx.BiosVersion},
            {key: 'System Health', value: ComEx.Health},
            {key: 'System Power', value: ComEx.PowerState},
            {key: 'TPM Status', value: ComEx.TPM_state},
            {key: 'TPM Module Type', value: ''},
            
        ]
          const ESCtdata = EscOverviewItems.map((overview) =>
            <TableRow><td><strong>{overview.key}</strong></td><td>{overview.value}</td></TableRow>
          );
          const HOSTtdata = hostOverviewItems.map((hostOverview) =>
          <TableRow><td><strong>{hostOverview.key}</strong></td><td>{hostOverview.value}</td></TableRow>
        )
        return ( 
            <Box direction='row' align='start' >
                <Box pad='small' basis='medium' >
                    <Title> Information </Title>
                    <Table>
                        {ESCtdata}
                    </Table>
                </Box>
                <Box pad='small' align='end'>
                    <Title>Host Power Status & Health</Title>
                    <Table>
                        {HOSTtdata}
                    </Table>
                </Box>

            </Box>
        );
    }
}

// Overview.defaultProps = {
//     error: undefined,
//     Id: {},
//     Manafacturer: {},
//     Model: {},
//     Name: {}
//   };
  
  Overview.propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    Information: {},
    ComEx: {}
    // Id: PropTypes.string,
    // Manafacturer: PropTypes.string,
    // Model: PropTypes.string,
    // Name: PropTypes.string
  };
  

  
  const select = state => ({ ...state.dashboardReducer });
  
  export default connect(select)(Overview);
  