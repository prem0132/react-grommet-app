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
import Section from 'grommet/components/Section';
import TableHeader from 'grommet/components/TableHeader';

import { pageLoaded } from '../utils';
import { loadMemory,unloadMemory } from '../../actions/SystemInformation/Memory';
import store from '../../store';



const ColumnData=[
  {label: 'Memory Location',value: 'Id'},
  {label: 'Size',value: 'CapacityMiB'},
  {label: 'Maximum Frequency',value: 'OperatingSpeedMHz'},
  {label: 'Part Number',value: 'PartNumber'}
 ]

class Memory extends Component {
  constructor(props) {
    super(props);
    this._OnSort = this._OnSort.bind(this);
    const indexvalue = 0;
    const memorysort = false;
    this.state = {
      memorysort,
      indexvalue
      
    };


  }

    componentDidMount() {
    pageLoaded('Memory');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadMemory());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadMemory());
  }

  _Sort(indexvalue,memorysort) {
    const { value } = ColumnData[indexvalue];
    //console.log('row1',value)
    const {memoryarray} = this.props;
    //console.log('row2',memoryarray)
    return memoryarray.slice(0).sort((r1,r2) => {
       //console.log('row3',r1[value])
      if (r1[value] < r2[value]){
          return ( memorysort ? 1 : -1);
      } else if (r2[value] < r1[value]){
          return (memorysort ? -1 : 1)
      } else {
        return 0;
      }
    })
   
  }

  _OnSort(indexvalue,memorysort) {
    const data = this._Sort(indexvalue,memorysort);
      
    this.setState({
      data,indexvalue,memorysort
    });
   
  }


  render() {

    const { memoryarray } = this.props;
    const {memorysort,indexvalue} = this.state;
    let data = this._Sort(indexvalue, memorysort);
    const columnlabels = ColumnData.map((cd) => cd.label)

    //console.log(memoryarray)
    const memorydata = data.map((mem) =>
    <TableRow><td>{mem.Id}</td><td>{mem.CapacityMiB} MiB</td><td>{mem.OperatingSpeedMHz} MHz</td><td>{mem.PartNumber}</td></TableRow>
   );
   //console.log(memorydata)

  return (
    <Box  flex={true}>
      <Section pad="medium">
        <Box direction="row" align='start'>
        <Title>Memory Details</Title>
        <Anchor label='(Show empty sockets)'/>
        </Box>
        <Table>
        <TableHeader labels={columnlabels}
            sortIndex={indexvalue}
            sortAscending={memorysort}
            onSort={this._OnSort} />
          <tbody>
          {memorydata}
          </tbody>
        </Table>
        </Section>  
    </Box>         
    );
  }
};



Memory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Name: PropTypes.string
};



const select = state => ({ ...state.Memory });

export default connect(select)(Memory);