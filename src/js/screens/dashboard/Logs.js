import ReactDOM from 'react-dom';
import React from "react";
import { Component, PropTypes } from 'react';
import { connect } from "react-redux";

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import TableHeader from 'grommet/components/TableHeader';
import Search from 'grommet/components/Search';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import CircleInformationIcon from 'grommet/components/icons/base/CircleInformation';
import StatusIcon from 'grommet/components/icons/Status';
import TrashIcon from 'grommet/components/icons/base/Trash';
//import Query from 'grommet-addons/utils/Query';
//import{createFilter} from 'react-search-input'
import DocumentCsvIcon from 'grommet/components/icons/base/DocumentCsv';



import {LogsItemload, LogsItemUnload, loadImageOsTypes, deletelogs} from '../../actions/Dashboard/logs'
import { pageLoaded } from '../utils';
import { setInterval, clearInterval } from 'timers';
//import store from '../../store';

const LOG_OPTIONS=[
    {label: 'Health logs',value: 'healthlogs'},
    //{label: 'Management Logs',value: 'managementlogs'},
    {label: 'Event Logs',value: 'eventlogs'}
   ]


const KEYS_TO_FILTERS = ['Id', 'Severity', 'Message']

class Logs extends Component {

  constructor(props) {
    super(props);
    this._onChangeOption = this._onChangeOption.bind(this);
    this._renderLogo = this._renderLogo.bind(this);
    this._logTypeChange = this._logTypeChange.bind(this);
    this._deleteLogs = this._deleteLogs.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this.state = {
      currentValue:LOG_OPTIONS[1],
      LogsInfoArray: [],
      //filteredDataList:[],
      refreshInterval: undefined,
      searchText: ''
      
    }
        
  }

     
 
  componentDidMount() {
	//console.log("componentDidMount entered");
    pageLoaded('Logs');
    // this.props.dispatch(LogsItemload());
    this.props.dispatch(loadImageOsTypes(this.state.currentValue));
     let interval;
     interval = setInterval( ()=> {
      // this.props.dispatch(LogsItemload());
      this.props.dispatch(loadImageOsTypes(this.state.currentValue))}, 10000);
      this.setState({refreshInterval: interval}); 
   
  }

  componentWillReceiveProps (nextProps) {
    //console.log("in componentWillReceiveProps");
    if (!this.state.searchText) {
     //console.log("in componentWillReceiveProps in if");
    
      this.setState({ LogsInfoArray: nextProps.LogsInfoAr });

    }
  }




  componentWillUnmount() {
	
    clearInterval(this.state.refreshInterval);
    this.props.dispatch(LogsItemUnload());
  }


  _logTypeChange() {
    this.props.dispatch(loadImageOsTypes(this.state.currentValue));
  }


  _onChangeOption(event) {
    //console.log(event);
    this.setState({ currentValue: event.option },this._logTypeChange);
    
    //this.props.dispatch(loadImageOsTypes(osTypeSearchText));
  }

  _onSearch ( KEYS_TO_FILTERS,event) {
    //console.log("in onsearch entered");
    //console.log("in onsearch 1",KEYS_TO_FILTERS,event);
    this.setState({ searchText: event.target.value });

    if (!event.target.value) {
      this.setState({
        LogsInfoArray: this.props.LogsInfoAr
      });
    } else{

          var filterBy = event.target.value.toString().toLowerCase();
          //console.log("in onsearch 2",filterBy);
          
          var filteredList = [];
          //console.log("in onsearch 3",this.props.LogsInfoAr.length,this.props.LogsInfoAr);
          for (var index = 0; index < this.props.LogsInfoAr.length; index++) {
            for (var i = 0; i < KEYS_TO_FILTERS.length; i++) {
              //console.log("v value",index,this.props.LogsInfoAr[index][KEYS_TO_FILTERS[i]]);
            
              var v = this.props.LogsInfoAr[index][KEYS_TO_FILTERS[i]];
              //console.log("v value",v);
              if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
                filteredList.push(this.props.LogsInfoAr[index]);
                break;
              }
            }
          }
          //console.log("in onsearch before setsate logsinfoarr",filteredList);

          this.setState({
            LogsInfoArray: filteredList
          });
      } 
  }

  _deleteLogs(){
    //console.log(this.state.currentValue);
    
    if (window.confirm('Are you sure you want to clear the ESC ' + this.state.currentValue.label + ' ? '))
    {
      this.props.dispatch(deletelogs(this.state.currentValue));
    }    
  }


  _renderLogo(status){
    let logo;
    //console.log(status);

    if ('INFO'=== status ){

      logo = ( 
        <CircleInformationIcon size="small" />
      );

    } else if('CRITICAL'=== status){
      logo = ( 
        <StatusIcon value='critical' size="small" />
      );
    
    } 
   return logo; 
  }





  render() {
    //const { LogsInfoArray } = this.props;
    const { searchText } = this.state;
 
    
    //console.log('Screen state=',this.state.LogsInfoArray)
    //console.log('Screen state currentvalue=',currentValue)
   //console.log('Screen state=',  this.state,'FI',firmwareInfoAr,'fi', this.props,'store.getstate:',store.getState());
     
  // const filteredLogsInfoAr = LogsInfoAr.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS))

    const Logsdata = this.state.LogsInfoArray.map((data) =>
    <TableRow><td>{data.Id}</td><td>{this._renderLogo(data.Severity)}</td><td>{data.Message}</td><td>{(new Date(Number(data.time) * 1000)).toLocaleString()}</td></TableRow>
    ); 

    let uri;
    if (this.state.currentValue.label == 'Event Logs') {
      uri = '/redfish/v1/Managers/1/LogServices/Eventlog/Oem/Hpe/CsvService';
    }
    else {
      uri = '/redfish/v1/Systems/1/LogServices/HealthLog/Oem/Hpe/CsvService';
    }
    let fileUrl = window.origin + uri;
    
    let downloadfile = this.state.currentValue.label + '.csv';
    
    let _downloadLink = <a href={fileUrl} download={downloadfile} />




    return ( 
        <Box >
            <Header size='large' pad={{ horizontal: 'medium' }}>
                <Select placeHolder='Event Logs'
                        options={LOG_OPTIONS}
                        value={this.state.currentValue}  onChange={this._onChangeOption} >
                </Select>
                <Search inline={true} fill={true} size='medium' placeHolder='Search'
                 value={searchText} onDOMChange={this._onSearch.bind(this,KEYS_TO_FILTERS)}  />
                <Button icon={<TrashIcon />}
                      onClick={this.props.accountType== 'admin'? this._deleteLogs:null}
                       />
                <Button icon={<DocumentCsvIcon />} href={this.props.accountType== 'admin'? fileUrl:null} download={downloadfile}   />
            </Header>
            
            <Table selectable={true} >
              {/* <TableHeader labels={['ID', 'Severity', 'Description', 'Last Update', 'Count', 'Category']} /> */}
              <TableHeader labels={['ID', 'Severity', 'Description', 'Last Update']} />
              <tbody>
               {Logsdata}
              </tbody>
            </Table>
             
        </Box>         
    );
  }
};


Logs.defaultProps = { 
    LogsInfoAr: []    
};



Logs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  LogsInfoAr: PropTypes.arrayOf(PropTypes.object),
  //currentValue: PropTypes.string
};


const select = (state) => (
  
  { ...state.logs,...state.session }
);

export default connect(select)(Logs);
