import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, Columns, Label } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import TableHeader from 'grommet/components/TableHeader';
import Section from 'grommet/components/Section';

import { pageLoaded } from '../utils';
import { loadNetwork,unloadNetwork } from '../../actions/SystemInformation/Network';
import store from '../../store';

class Network extends Component{
    constructor(props) {
        super(props);
        this.state = {
          networkarray: undefined
        };    
      }
	
	
	componentDidMount() {
    pageLoaded('Network');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadNetwork());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadNetwork());
  }
  
  
    render() {

        const { networkarray } = this.props;
        //console.log(networkarray)
        
        const networkdata = networkarray.map((network) =>
        <TableRow>
            <td>
                MAC {networkarray.indexOf(network)} - {network.MACAddress}
            </td>
        </TableRow>
        );
        
        //console.log(networkdata)
    

        return(
            <Box direction='column' align='start'>
            {/* <Accordion>
                <AccordionPanel heading='Expand All' pad='small'> */}
                  
                    <Title>Physical Network Adapters</Title>
                    {/* <Anchor href=''>Network Ports</Anchor> */}
                   
                    <Box flex={true} >
                    <Section pad="medium">
                    {networkdata}
                    </Section>
                    </Box>
                    
                         
                {/* </AccordionPanel>

            </Accordion> */}
            </Box>



        );
    }
};



Network.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Name: PropTypes.string
};



const select = state => ({ ...state.Network });

export default connect(select)(Network);