import ReactDOM from 'react-dom';
import React from "react";
import { Component, PropTypes } from 'react';
import { connect } from "react-redux";



import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';

import Paragraph from 'grommet/components/Paragraph';
import TableHeader from 'grommet/components/TableHeader';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';

import StatusIcon from 'grommet/components/icons/Status';

import { pageLoaded } from '../utils';
import { loadSummary,unloadSummary } from '../../actions/Power&Thermal/Temperature';
import { setInterval, clearInterval } from 'timers';
import store from '../../store';




const ColumnData=[
  {label: 'Sensor',value: 'SensorNumber'},
  //{label: 'Management Logs',value: 'managementlogs'},
  {label: 'Status',value: 'Health'},
  {label: 'Reading',value: 'ReadingCelsius'},
  {label: 'Threshold',value: 'UpperThresholdFatal'}
 ]


class Temperature extends Component {

  constructor(props) {
    super(props);
    this._OnClickFahrenheit = this._OnClickFahrenheit.bind(this);
    this._OnClickCelcius = this._OnClickCelcius.bind(this);
    //this._renderLogo = this._renderLogo.bind(this);
    //this._decimals = this._decimals.bind(this);
    this._OnSort = this._OnSort.bind(this);
    const indexvalue = 0;
    const sensorsSort = false;
    //const data = this._Sort(indexvalue, sensorsSort);
    this.state = {
     // currentValue:undefined,
     celciuscolor: true,
     sensorsSort,
     fahrenheitcolor: false,
     showFahrenheit: false,
     indexvalue,
     refreshInterval: undefined
    // data
    }
        
  }


  componentDidMount() {
    pageLoaded('Temperature');
    //console.log("componentDidMount entered ");
    this.props.dispatch(loadSummary());
    let interval;
     interval = setInterval( ()=> {
      // this.props.dispatch(LogsItemload());
      this.props.dispatch(loadSummary())}, 10000);
      this.setState({refreshInterval: interval}); 
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    clearInterval(this.state.refreshInterval);
    //console.log("componentWillUnMount entered");
    dispatch(unloadSummary());
  }

  /*!
 * OnClick function for Fahrenheit Button
 * Changes colour of button when Clicked
 */
   _OnClickFahrenheit() {

    this.setState({
      showFahrenheit: true,
      celciuscolor: false,
      fahrenheitcolor: true,
    });
  }

  /*!
 * OnClick function for Celsius Button
 * Changes colour of button when Clicked
 */
  _OnClickCelcius() {

    this.setState({
      showFahrenheit: false,
      celciuscolor: true,
      fahrenheitcolor: false,

    });
  }


  _Sort(indexvalue,sensorsSort) {
    const { value } = ColumnData[indexvalue];
    //console.log('row1',value)
    const {Temperatures} = this.props;
    //console.log('row2',Temperatures)
    return Temperatures.slice(0).sort((r1,r2) => {
     //console.log('row3',r1[value])
      if (r1[value] < r2[value]){
          return ( sensorsSort ? 1 : -1);
      } else if (r2[value] < r1[value]){
          return (sensorsSort ? -1 : 1)
      } else {
        return 0;
      }
    })
   
  }

    /*!
 * OnClick function for Celsius Button
 * Changes colour of button when Clicked
 */
  _OnSort(indexvalue,sensorsSort) {
    const data = this._Sort(indexvalue,sensorsSort);
      
    this.setState({
      data,indexvalue,sensorsSort
    });
   
  }

  /*!
  * Called to Display Icon for each State
  */
  _renderLogo(status){
    let logo;
    //console.log(status);

    if ('Enabled'=== status ){

      logo = ( 
        <StatusIcon value='ok' size="small" />
      );

    } else if('Disabled'=== status){
      logo = ( 
        <StatusIcon value='critical' size="small" />
      );
    
    } 
   return logo; 
  }

  /*!
   * Convert Celcius to Fahrenheit
  */
 _decimals(x) {
    let pTemp = Number.parseFloat(x * 1.8 + 32).toPrecision(4);
    return Number.parseFloat(pTemp).toFixed(0);
  }

  /*!
  * Display NA if reading is 0
  */
  _DisplayNA(data){
   let value;
    if(data===0){
      value = 'NA';
    }else{
      value = data + '°C'
    }
   return value;
  }

  render() {
    //console.log('render enterred');
    const {Temperatures} = this.props;

    const {sensorsSort,indexvalue} = this.state;


     let data = this._Sort(indexvalue, sensorsSort);
    //console.log('stateAnu=', data);
    const columnlabels = ColumnData.map((cd) => cd.label)
    
  
   
    //console.log('state=', store.getState(), this.state,'props:', this.props);

    //console.log("Temp Conv: ",this.state.showFahrenheit);
    let tempData;
    if (this.state.showFahrenheit){
        tempData = data.map((temp) => 
            <TableRow><td>{temp.SensorNumber}-{temp.Name}</td><td>{this._renderLogo(temp.State)} {temp.Health}</td><td>{this._decimals(temp.ReadingCelsius)}°F</td><td>Caution: {this._decimals(temp.UpperThresholdFatal)}°F Critical: {this._decimals(temp.UpperThresholdCritical)}°F</td></TableRow>
         ) } else {
        tempData = data.map((temp) =>
    
          <TableRow><td>{temp.SensorNumber}-{temp.Name}</td><td>{this._renderLogo(temp.State)} {temp.Health}</td><td>{this._DisplayNA(temp.ReadingCelsius)}</td><td>Caution: {this._DisplayNA(temp.UpperThresholdFatal)} Critical: {this._DisplayNA(temp.UpperThresholdCritical)}</td></TableRow>
        )
    }

    
  


    return (
    <Box flex={true}>
      <Section pad="medium">
      
        <Box direction="row" align='start'>
          <Title>Sensors Data</Title>
          {/* <Anchor label='(Show missing sensors)'/> */}
        </Box>
        <Box justify='end' align='end' direction="row">
          <Button label='°C' type='submit' primary={this.state.celciuscolor} onClick={this._OnClickCelcius} />
          <Button  label='°F' type='submit' primary={this.state.fahrenheitcolor} onClick={this._OnClickFahrenheit}/>
        </Box>
        <Table>
          <TableHeader labels={columnlabels}
            sortIndex={indexvalue}
            sortAscending={sensorsSort}
            onSort={this._OnSort} />
        
            <tbody>
              {tempData}
            </tbody>
        </Table>

        </Section>
         
    </Box>         
    );
  }
};



Temperature.propTypes = {
  dispatch: PropTypes.func.isRequired,
 // Name: PropTypes.string
 Temperatures: PropTypes.arrayOf(PropTypes.object)
};



const select = state => ({ ...state.Temperature });

export default connect(select)(Temperature);