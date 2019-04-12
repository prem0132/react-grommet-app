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


import { pageLoaded } from '../utils';
import { loadSysSummary,unloadSysSummary } from '../../actions/SystemInformation/SyssummaryAction';

import StatusIcon from 'grommet/components/icons/Status';




class SysSummary extends Component {


    componentDidMount() {
    pageLoaded('SysSummary');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadSysSummary());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadSysSummary());
  }


  _renderlogo(status){
    let logo;
    //console.log(status);

    if ('OK'=== status || 'Redundant' === status){

      logo = ( 
        <StatusIcon value='ok' size="medium" />
      );

    } else if('Failed'===status || 'Failed Redundant' === status){
      logo = ( 
        <StatusIcon value='critical' size="medium" />
      );
    
    } else if('Unknown'===status){
      logo = ( 
        <StatusIcon value='unknown' size="medium" />
      );
  
    } else if('Not Redundant'===status || 'Degraded' === status){
      logo = ( 
        <StatusIcon value='warning' size="medium" />
      );
    
    } 
   return logo; 
  }

  render() {  
    
    const { BiosOrHardwareHealth, Memory, Network, PowerSupplies, Temperatures} = this.props;
    //console.log("Data = ", BiosOrHardwareHealth)


    const sumitems = [
      {label: 'Bios and Hardware Health',value: BiosOrHardwareHealth},
      {label: 'Memory', value: Memory},
      {label: 'Network',value: Network},
      {label: 'Power Supply',value: PowerSupplies},
      {label: 'Temperatures',value: Temperatures},
      //{label: 'Temperatures',value: ''}
    ]
    const sumdata = sumitems.map((sum) =>
    //<TableRow><td>{sum.label}</td><td><Box direction='row' align='center' pad={{ between: 'small' }}>{this._renderlogo(sum.value)}<span>{sum.value}</span></Box></td></TableRow>
    <TableRow><td>{sum.label}</td><td>{this._renderlogo(sum.value)}</td></TableRow>
   );

    
  

    return (   
						
				
      <Box flex={true} >
        
        <Section pad="medium">
                      
              <Title>Summary</Title>

                  <Table selectable={true} >
              <thead>
                <tr><th>Subsystem and Devices</th><th>Status</th></tr>
              </thead>
              <tbody>
              {sumdata}			    
              </tbody>
            </Table>
            </Section>   
        </Box>      
   
    );
  }
};


SysSummary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Oem: PropTypes.object
 // Hpe: PropTypes.object,
 /* Oem: PropTypes.shape({
    Hpe: PropTypes.shape({
      AggregateHealthStatus: PropTypes.shape({
        BiosOrHardwareHealth: PropTypes.shape({Status: PropTypes.object}),
        Memory: PropTypes.shape({Status: PropTypes.object}),
        Network: PropTypes.shape({Status: PropTypes.object}),
        PowerSupplies: PropTypes.shape({Status: PropTypes.object}),
        Temperatures: PropTypes.shape({Status: PropTypes.object})
      })
    })

  })*/
};



const select = state => ({ ...state.Sys_Summary });

export default connect(select)(SysSummary);
