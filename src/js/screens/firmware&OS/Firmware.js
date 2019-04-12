import ReactDOM from 'react-dom';
import React from "react";
import { Component, PropTypes } from 'react';
import { connect } from "react-redux";

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';

import { loadfirmware,unloadfirmware } from '../../actions/Firmware/firmware_OS';
import { pageLoaded } from '../utils';
import store from '../../store';

class Firmware extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firmwareInfoAr: undefined
    };

  }
 
  componentDidMount() {
	 //console.log("componentDidMount entered");
    pageLoaded('Firmware');
    this.props.dispatch(loadfirmware());
 
   
  }

  componentWillUnmount() {
	//console.log("componentWillUnMount entered");
    const { dispatch } = this.props;
    dispatch(unloadfirmware());
  }




  render() {
    //console.log('Screen initial state=',  this.state)
    const { firmwareInfoAr } = this.props;
    //this.state = this.props;
    //console.log('Screen final state=',this.state)
    //this.setState({firmwareInfoAr: this.props})
    //firmwareInfoAr = this.state;
    //console.log('store.getstate:',store.getState());
   
    const firmdata = firmwareInfoAr.map((firm) =>
    //  <TableRow><td>{firm.Name}</td><td>{firm.Version}</td><td>{firm.DeviceContext}</td></TableRow>
     <TableRow><td>{firm.Name}</td><td>{firm.Version}</td></TableRow>
    );


    return ( 
      <Box flex={true} >
        
        <Section pad="medium">
                      
              <Title>Firmware</Title>
            
            <Table selectable={true} >
              <thead>
                <tr>
                  <th>
                    Firmware Name
                  </th>
                  <th>
                    Firmware Version
                  </th>
                  {/* <th>
                    Location
                  </th> */}
                </tr>
              </thead>
              <tbody>
               {firmdata}
              </tbody>
            </Table>
          </Section>   
        </Box>         
    );
  }
};


Firmware.defaultProps = { 
  firmwareInfoAr: []
};



Firmware.propTypes = {
  dispatch: PropTypes.func.isRequired,
  firmwareInfoAr: PropTypes.arrayOf(PropTypes.object)
};



const select = state => ({ ...state.firmware_OS });

export default connect(select)(Firmware);
