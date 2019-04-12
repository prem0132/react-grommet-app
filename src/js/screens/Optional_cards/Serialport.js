import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, Paragraph, Anchor } from 'grommet';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Select from 'grommet/components/Select';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadOptionalCards, unloadOptionalCards, changeSerialPortSettings } from '../../actions/Optional_cards';


class Serialport extends Component {
    constructor(props){
        super(props);
        //console.log(store.getState());        
        //this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._selected = this._selected.bind(this);
        this.state = {
            Port1Mode : undefined,
            Port2Mode: undefined,
            Port1Termination: undefined,
            Port2Termination: undefined
        }
    }

    componentWillMount() {
        pageLoaded('SerialPort');
        this.state.Port1Mode= store.getState().optionalcards.SerialPort.Port1.Mode;
        this.state.Port2Mode= store.getState().optionalcards.SerialPort.Port2.Mode;
        this.state.Port1Termination= store.getState().optionalcards.SerialPort.Port1.Termination;
        this.state.Port2Termination= store.getState().optionalcards.SerialPort.Port2.Termination;
        //console.log('//console.log(this.state)', this.state)
        //console.log('this.state.Port1.Mode', this.state.Port1Mode)

      }

      _onSubmit(){
        let patchdata = {
            "SerialPort": {
                "Port1": {
                    "Mode": this.state.Port1Mode,
                    "Termination": this.state.Port1Termination
                },
                "Port2": {
                    "Mode": this.state.Port2Mode,
                    "Termination": this.state.Port2Termination
                }
            }
         }
    

        //console.log('patchdata',patchdata)
        //alert('stop');
        this.props.dispatch(changeSerialPortSettings(patchdata))
        window.location = '/Optional_Cards'
    }

    _selected(option){
        //console.log('_selected(option)',option.option,option.target.name,option.target.id)
        this.setState({ [option.target.id] : option.option })
    }
    
    render(){

       //console.log('SP', this.props, 'SPSTATE:', this.state)

       //const {SerialPort} = this.props.SerialPort
        
            return(

                    <div>
                        <Header size="small" justify="between" >
                            <Title>Dual Serial Port Daughter card</Title>
                        </Header>
                        <Section>
                            <Heading tag = 'h5'><strong>Model:   </strong><span>{this.props.SerialPort.Model}</span></Heading>
                            <Heading tag = 'h5'><strong>Serial Number:   </strong><span>{this.props.SerialPort.SerialNumber}</span></Heading>
                            <Box direction='row' align='start' >
                                <Box align='center' pad='small' basis='medium' >
                                    <Heading tag = 'h4'><strong>PORT 1</strong></Heading>
                                    <Table>
                                        <tbody>
                                            <TableRow><td><strong>Mode</strong></td>
                                                <td><Select id="Port1Mode" name="osType" placeHolder={this.state.Port1Mode} value={this.props.accountType== 'admin'?this.state.Port1Mode:null} options={this.props.accountType== 'admin'? ["Loopback","RS-232","RS-485Half","RS-485FULL"]:null} onChange={this._selected} /></td>
                                            </TableRow>
                                            <TableRow><td><strong>Termination</strong></td>
                                                <td><Select id="Port1Termination"  name="osType" placeHolder={this.state.Port1Termination} value={this.props.accountType== 'admin'? this.state.Port1Termination:null} options={this.props.accountType== 'admin'? ["Disabled","Enabled"]:null} onChange={this._selected} /></td>
                                            </TableRow>
                                            
                                        </tbody>
                                    </Table>
                                </Box>
                                <Box pad='small' align='center'>
                                <Heading tag = 'h4'><strong>PORT 2</strong></Heading>
                                    <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port2Mode" name="osType" placeHolder={this.state.Port2Mode} value={this.props.accountType== 'admin'? this.state.Port2Mode:null} options={this.props.accountType== 'admin'? ["Loopback","RS-232","RS-485Half","RS-485FULL"]:null} onChange={this._selected}/></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port2Termination" name="osType" placeHolder={this.state.Port2Termination} value={this.props.accountType== 'admin'? this.state.Port2Termination:null} options={this.props.accountType== 'admin'? ["Disabled","Enabled"]:null} onChange={this._selected} /></td>
                                        </TableRow>
                                        
                                    </tbody>
                                    </Table>
                                </Box>
                            </Box>
                    </Section>
                    <Footer pad="medium" justify="between">
                        <Button type={this.props.accountType== 'admin'? 'submit':null} primary={true} label='Apply' onClick={this.props.accountType== 'admin'? this._onSubmit:null}/>
                    </Footer>
                </div>
            )
    }
}


const select = state => ({ ...state.optionalcards,...state.session });

export default connect(select)(Serialport);
