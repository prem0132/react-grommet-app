//TO DO: No storage tab this file need to be deleted
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';


import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';


import { pageLoaded } from '../utils';
import { loadSummary,unloadSummary } from '../../actions/SystemInformation/Storage';

class Storage extends Component {

    componentDidMount() {
    pageLoaded('Storage');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadSummary());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
   //console.log("componentWillUnMount entered");
    dispatch(unloadSummary());
  }


  render() {


    return (
        <Box>

<Box direction="row" align='start'>
 <Title>Storage Details</Title>
 <Anchor label='(Show empty sockets)'/>
 </Box>


 </Box>          

   
    );
  }
};



Storage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Name: PropTypes.string
};



const select = state => ({ ...state.Storage });

export default connect(select)(Storage);
