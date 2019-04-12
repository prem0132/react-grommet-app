import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";


import { Grommet, App, Header, Label } from 'grommet';
import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import Section from 'grommet/components/Section';
import FormFields from 'grommet/components/FormFields';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import TableRow from 'grommet/components/TableRow';
import Table from 'grommet/components/Table';
//import {Power} from 'grommet-icons';
import RadioButton from 'grommet/components/RadioButton';
import PowerIcon from 'grommet/components/icons/base/Power';

import { pageLoaded } from '../utils';
import { computerReset } from '../../actions/Power&Thermal/SystemPower';
import { loadSysPower, unloadSysPower } from '../../actions/Power&Thermal/SystemPower';
import store from '../../store';
import { setInterval, clearInterval } from 'timers';

class SystemPower extends Component {
    constructor(props) {
        super(props);
        this._powerReset = this._powerReset.bind(this);
        refreshInterval: undefined
       // this.loadData = this.loadData.bind(this);
    }

    componentDidMount(){
        pageLoaded('SystemPower');
        
        this.props.dispatch(loadSysPower());
        let interval;
        interval = setInterval( () =>{
            this.props.dispatch(loadSysPower())
        } , 10000);
        this.setState({refreshInterval: interval});
    }
    componentWillUnmount(){
        clearInterval(this.state.refreshInterval);
        this.props.dispatch(unloadSysPower());

    }

    _powerReset(event, buttonSelected, actionType) {//console.log('clicked power button',actionType);
        var userConfirm = false;
        if(buttonSelected == 1)
            userConfirm = confirm('Are you sure you want to Gracefully shut down this device ? ');
        else if(buttonSelected == 2)
            userConfirm = confirm('Are you sure you want to Force shut down this device ? ');
        else if(buttonSelected == 3)
            userConfirm = confirm('Are you sure you want to Force reset this device ? ');
        else if(buttonSelected == 4)
            userConfirm = confirm('Are you sure you want to Power on this device ? ');
        else
            userConfirm = false;

        if(userConfirm == true)
        {
            var ret;
            ret = this.props.dispatch(computerReset(actionType));
        }
    
}

  render() {
      //console.log('1',this.props);
      //console.log('2', store.getState());
      //const powerState = store.getState().Sys_Summary.PowerState
      const {powerState} = this.props

      
      //console.log('3',this.state, powerState);
      //const {colorIndex, resetStatus} = this.props;
      var colorIndex = powerState == "On" ? 'brand' : 'plain';
      var powerString = powerState == "On" ? ' ON ' : ' OFF ';
      
      
      return (
      <Box justify='center'
          align='center'
          wrap={true}
          pad='large'
          margin='small'
          colorIndex='light-1'
          >
          <Form>
              <Section>
                  <Header>
                      <Title>
                      Virtual Power Button
                      </Title>
                  </Header>
                  
                  <FormFields>
                    <Table>
                    <div>
                      <tbody>
                        <TableRow><td>System Power:</td>
                            <td>
                            <Box pad={{ between: 'small' }} align='center'><PowerIcon colorIndex={colorIndex}/>{powerString}</Box>
                            </td>
                        </TableRow>
                        
                        {powerState == "On" ? (
                            <div>
                            <TableRow><td>Graceful Power Off:</td>
                                <td><Button id='PushPowerButton' fill='false' align='center' label='Momentary Press' type={this.props.accountType== 'admin'? 'reset':null}
                                onClick={this.props.accountType== 'admin'? (event) =>{this._powerReset(event, 1, 'GracefulShutdown')}:null} /></td>
                                {/* onClick = {this._powerReset('1')} /></td> */}
                            </TableRow>
                            <TableRow><td>Force Power Off:</td>
                                <td><Button fill='false' align='center' label='Press and Hold' type={this.props.accountType== 'admin'? 'reset':null}
                                    onClick={this.props.accountType== 'admin'? (event) =>{ this._powerReset(event, 2, "ForceOff")}:null}/></td>
                            </TableRow>
                            {/* <TableRow><td>Graceful Power Cycle:</td>
                                <td><Button fill='false' align='center' label='Cold Boot' type='reset' 
                                    onClick={(event) =>{ this._powerReset(event, "  ")}}/></td>
                            </TableRow> */}
                            <TableRow><td>Force System Reset</td>
                                <td><Button fill='false' align='center' label='Reset' type={this.props.accountType== 'admin'? 'reset':null} 
                                    onClick={this.props.accountType== 'admin'? (event) =>{ this._powerReset(event, 3, "ForceRestart")}:null}/></td>
                            </TableRow>
                        </div>
                        ):(
                                
                                <TableRow><td>Power On:</td>
                                <td><Button fill='false' align='center' label='Momentary Press' type={this.props.accountType== 'admin'? 'reset':null} 
                                    onClick={this.props.accountType== 'admin'? (event) =>{ this._powerReset(event, 4, "On")}:null}/></td>
                                 </TableRow>
                                 
                        )}
                        
                        


                      </tbody>
                      </div>
                    </Table>
                  </FormFields>
              </Section>
                {/* <Section>
                    <Header>
                        <Title>
                        System Power Restore Settings
                        </Title>
                    </Header>
                    <FormFields>
                        <FormField>
                            <Label>Auto Power-On</Label>
                            <RadioButton id='choice1-1'
                            name='choice1-1'
                            label='Always Power On'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice1-2'
                            name='choice1-2'
                            label='Always Remain Off'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice1-3'
                            name='choice1-3'
                            label='Restore Last Power State'
                            checked={true}
                            onChange='' />
                        </FormField>
                        <FormField>
                        <Label>Power-On Delay</Label>
                            <RadioButton id='choice2-1'
                            name='choice2-1'
                            label=' Minimum Delay'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice2-2'
                            name='choice2-2'
                            label=' 15 Second Delay'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice2-3'
                            name='choice2-3'
                            label='30 Second Delay'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice2-4'
                            name='choice2-4'
                            label='45 Second Delay'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice2-5'
                            name='choice2-5'
                            label='60 Second Delay'
                            checked={true}
                            onChange='' />
                            <RadioButton id='choice2-6'
                            name='choice2-6'
                            label='Random Upto 120'
                            checked={true}
                            onChange='' />
                        </FormField>
                        
                    </FormFields>
                    <Footer pad={{"vertical": "medium"}}>
                        
                        <Button label='Apply'
                            align='center'
                            type='submit'
                            primary={true}
                            onClick='' />
                    </Footer>
                    
                    
                </Section> */}
              
          </Form>  
      </Box>
     
      );
    }
  }
  
  SystemPower.propTypes = {
    //colorIndex: PropTypes.string,
    PowerState: PropTypes.string
  };

const select = state => ({ ...state.SystemPower,...state.session });

export default connect(select)(SystemPower);