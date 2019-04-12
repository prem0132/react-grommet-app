import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
//import {debugService} from '../../actions/Dashboard/diagnostics';
import { pageLoaded } from '../utils';
// import { pageLoaded,getItem } from '../../actions/utils';

class Diagnostics extends Component {

 

    componentDidMount() {
        pageLoaded('Diagnostics');
    }


    render() {
         var loc=window.location.origin + "/redfish/v1/Managers/1/DebugService"
        return ( 
            <Box align='start' >
                <Header>
              <Title>  Download the system diagnostics </Title>
              </Header>
              <Footer>
              <Box pad='small'>
              <Button label='Download' type={this.props.accountType== 'admin'? 'submit':null} 
              href = {this.props.accountType== 'admin'?loc:null} download="debug.bin"/>
              </Box>
              </Footer>

            </Box>
        );
    }
}

const select = state => ({ ...state.session });

export default connect(select)(Diagnostics);