import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import store from '../../store';

import { pageLoaded } from '../utils';
import { loadSummary,unloadSummary } from '../../actions/Network/Summary';



class Summary extends Component { 


    componentDidMount() {
    pageLoaded('Network Summary');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadSummary());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
   //console.log("componentWillUnMount entered");
    dispatch(unloadSummary());
  }

  render() { 

    const {MACAddress, HostName, FQDN, PermanentMACAddress, Name,  IPv6DefaultGateway, SpeedMbps, 
      IPv6Addresses, IPv4Addresses, IPv6AddressPolicyTable, SSID, Status, Strength,
       Security, lteNetwork, lteStatus, lteAPN, lteEnabled} = this.props;
    //console.log("Enabled", lteEnabled)
    //console.log(store.getState())

    return (   
						
				<div>		
				<Section pad="medium">
					<Title >Information</Title>
						<Table>
							<tbody>
								<TableRow><td>Name</td><td>{Name}</td></TableRow>
								<TableRow><td>Host Name</td><td>{HostName}</td></TableRow>
                <TableRow><td>MAC Address</td><td>{MACAddress}</td></TableRow>
								<TableRow><td>Permanent MAC Address</td><td>{PermanentMACAddress}</td></TableRow>
								<TableRow><td>FQDN</td><td>{FQDN}</td></TableRow>
								<TableRow><td>IPv6 Default Gateway</td><td>{IPv6DefaultGateway}</td></TableRow>    
								<TableRow><td>Speed (Mbps)</td><td>{SpeedMbps}</td></TableRow>
                <TableRow><td>WiFi Network</td><td>{SSID}</td></TableRow>
                <TableRow><td>Cellular Network</td><td>{lteNetwork}</td></TableRow>

							</tbody>
						</Table>

            <Table>
              <Title >IPv4 Addresses</Title>
              
                <tbody>
                <TableRow><th>Address</th><th>Address Origin</th><th>Gateway</th><th>Subnet Mask</th></TableRow>
                  <TableRow><td>{IPv4Addresses.Address}</td><td>{IPv4Addresses.AddressOrigin}</td><td>{IPv4Addresses.Gateway}</td><td>{IPv4Addresses.SubnetMask}</td></TableRow>                
                </tbody>
              


              <Title >IPv6 Addresses</Title>
              
                <tbody>
                <TableRow><th>Address</th><th>Address State</th><th>Gateway</th><th>Prefix Length</th></TableRow>
                  <TableRow><td>{IPv6Addresses.Address}</td><td>{IPv6Addresses.AddressState}</td><td>{IPv6Addresses.Gateway}</td><td>{IPv6Addresses.PrefixLength}</td></TableRow>
                  
                </tbody>
              


              <Title >IPv6 Address Policy Table</Title>
              
                <tbody>
                <TableRow><th>Label</th><th>Precedence</th><th>Prefix</th></TableRow>
                  <TableRow><td>{IPv6AddressPolicyTable.Label}</td><td>{IPv6AddressPolicyTable.Precedence}</td><td>{IPv6AddressPolicyTable.Prefix}</td></TableRow>
                  
                </tbody>
              
            </Table>


            <Title >WiFi Summary</Title>
            <Table>
              <tbody>
              <TableRow><td>SSID</td><td>{SSID}</td></TableRow>
              <TableRow><td>Strength</td><td>{Strength}</td></TableRow>
              <TableRow><td>Status</td><td>{Status}</td></TableRow>
              <TableRow><td>Security</td><td>{Security}</td></TableRow>  
              </tbody>
            </Table>  

            <Title >LTE Summary</Title>
            <Table>
              <tbody>
              <TableRow><td>Enabled</td><td>{lteEnabled}</td></TableRow>
              <TableRow><td>APN</td><td>{lteAPN}</td></TableRow>
              <TableRow><td>Status</td><td>{lteStatus}</td></TableRow>
              </tbody>
            </Table>             

				</Section>

                </div>
 
 
    );
  }
}


Summary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  MACAddress: PropTypes.string,
  HostName: PropTypes.string,
  FQDN: PropTypes.string,
  PermanentMACAddress: PropTypes.string,
  SpeedMbps: PropTypes.string,
  Name: PropTypes.string,
  IPv6DefaultGateway: PropTypes.string,
};



const select = state => ({ ...state.network });

export default connect(select)(Summary);
