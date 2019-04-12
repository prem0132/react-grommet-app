import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App } from 'grommet';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Section from 'grommet/components/Section';


import { pageLoaded } from '../utils';
import { loadProcessor,unloadProcessor } from '../../actions/SystemInformation/Processor';
import store from '../../store';


class Processor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processorarray: undefined
    };
  }
  
  componentDidMount() {
    pageLoaded('Processor');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadProcessor());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadProcessor());
  }

  
  render() {
    
    const { processorarray } = this.props;
    //console.log('processorarray in screens:',processorarray);


    const processordata = processorarray.map((processor) =>{
      let cachearray = processor.Cache;
      const cachaData = cachearray.map(cache => (
        //console.log('processorarray in screens:',cache.Name);
      
         
       <TableRow><td>Internal {cache.Name}</td><td>{cache.InstalledSizeKB} KB</td></TableRow>
        
        
      ));
    
   return( 
    <Table selectable={true} >
    <h3>Processor {processor.Id}</h3>
    <tbody>
    <TableRow><td>Processor Name</td><td>{processor.Model}</td></TableRow>
    <TableRow><td>Processor Speed</td><td>{processor.MaxSpeedMHz} MHz</td></TableRow>
    <TableRow><td>Execution Technology</td><td>{processor.CoresEnabled}/{processor.TotalCores} cores; {processor.TotalThreads} threads</td></TableRow>
    {cachaData}
    </tbody>
    </Table>
   )
    }
   );

    return (


                 <Box flex={true} >
        
              <Section pad="medium">
              <Box flex={true} >
              {processordata}			    
              </Box>
            </Section>   
            </Box>


    );
  }
};


Processor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Name: PropTypes.string
};



const select = state => ({ ...state.Processor });

export default connect(select)(Processor);