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
import Columns from 'grommet/components/Columns';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadOptionalCards,unloadOptionalCards,changeSerialPortSettings } from '../../actions/Optional_cards';

class Dio extends Component {
    constructor(props){
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._selected = this._selected.bind(this);
        this.state = {
            Port1Mode : undefined,
            Port2Mode: undefined,
            Port3Mode: undefined,
            Port4Mode: undefined,
            Port5Mode: undefined,
            Port6Mode: undefined,
            Port7Mode: undefined,
            Port8Mode: undefined,
            Port1Termination: undefined,
            Port2Termination: undefined,
            Port3Termination: undefined,
            Port4Termination: undefined,
            Port5Termination: undefined,
            Port6Termination: undefined,
            Port7Termination: undefined,
            Port8Termination: undefined
        };
    }

    componentWillMount() {
        pageLoaded('Dio');
        this.state.Port1Mode= store.getState().optionalcards.DigitalIO.Port1.Mode;
        this.state.Port2Mode= store.getState().optionalcards.DigitalIO.Port2.Mode;
        this.state.Port3Mode= store.getState().optionalcards.DigitalIO.Port3.Mode;
        this.state.Port4Mode= store.getState().optionalcards.DigitalIO.Port4.Mode;
        this.state.Port5Mode= store.getState().optionalcards.DigitalIO.Port5.Mode;
        this.state.Port6Mode= store.getState().optionalcards.DigitalIO.Port6.Mode;
        this.state.Port7Mode= store.getState().optionalcards.DigitalIO.Port7.Mode;
        this.state.Port8Mode= store.getState().optionalcards.DigitalIO.Port8.Mode;
        this.state.Port1Termination= store.getState().optionalcards.DigitalIO.Port1.Termination;
        this.state.Port2Termination= store.getState().optionalcards.DigitalIO.Port2.Termination;
        this.state.Port3Termination= store.getState().optionalcards.DigitalIO.Port3.Termination;
        this.state.Port4Termination= store.getState().optionalcards.DigitalIO.Port4.Termination;
        this.state.Port5Termination= store.getState().optionalcards.DigitalIO.Port5.Termination;
        this.state.Port6Termination= store.getState().optionalcards.DigitalIO.Port6.Termination;
        this.state.Port7Termination= store.getState().optionalcards.DigitalIO.Port7.Termination;
        this.state.Port8Termination= store.getState().optionalcards.DigitalIO.Port8.Termination;
        //console.log('//console.log(this.state)', this.state)
        //console.log('this.state.Port1.Mode', this.state.Port1Mode)
      }

      _onSubmit(){
        let patchdata = {
            "DigitalIO": {
                "Port1": {
                    "Mode": this.state.Port1Mode,
                    "Termination": this.state.Port1Termination
                },
                "Port2": {
                    "Mode": this.state.Port2Mode,
                    "Termination": this.state.Port2Termination
                },
                "Port3": {
                    "Mode": this.state.Port3Mode,
                    "Termination": this.state.Port3Termination
                },
                "Port4": {
                    "Mode": this.state.Port4Mode,
                    "Termination": this.state.Port4Termination
                },
                "Port5": {
                    "Mode": this.state.Port5Mode,
                    "Termination": this.state.Port5Termination
                },
                "Port6": {
                    "Mode": this.state.Port6Mode,
                    "Termination": this.state.Port6Termination
                },
                "Port7": {
                    "Mode": this.state.Port7Mode,
                    "Termination": this.state.Port7Termination
                },
                "Port8": {
                    "Mode": this.state.Port8Mode,
                    "Termination": this.state.Port8Termination
                }
            }
         }
    

        //console.log('patchdata',patchdata)
        this.props.dispatch(changeSerialPortSettings(patchdata))
        window.location = '/Optional_Cards'
    }

    _selected(option){
        //console.log('_selected(option)',option.option,option.target.name,option.target.id)
        this.setState({ [option.target.id] : option.option })
    }
    
    render(){

        
    
        return(




                <div>
                <Header size="small" justify="between" >
                    <Title>Octal DIO Daughter Card</Title>
                </Header>
                <Section>
                    <Heading tag = 'h5'><strong>Model:   </strong><span>{this.props.DigitalIO.Model}</span></Heading>
                    <Heading tag = 'h5'><strong>Serial Number:   </strong><span>{this.props.DigitalIO.SerialNumber}</span></Heading>
                    <Columns>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                    <Title><strong>PORT1</strong></Title>
                                    <Table>
                                        <tbody>
                                            <TableRow><td><strong>Mode</strong></td>
                                                <td><Select id="Port1Mode" name="osType" value={this.state.Port1Mode} options={["Output","Input"]} onChange={this._selected} /></td>
                                            </TableRow>
                                            <TableRow><td><strong>Termination</strong></td>
                                                <td><Select id="Port1Termination" name="osType" value={this.state.Port1Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected} /></td>
                                            </TableRow>
                                            
                                        </tbody>
                                    </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                    <Title><strong>PORT2</strong></Title>
                                    <Table>
                                        <tbody>
                                            <TableRow><td><strong>Mode</strong></td>
                                                <td><Select id="Port2Mode" name="osType" value={this.state.Port2Mode} options={["Output","Input"]} onChange={this._selected} /></td>
                                            </TableRow>
                                            <TableRow><td><strong>Termination</strong></td>
                                                <td><Select id="Port2Termination" name="osType" value={this.state.Port2Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected} /></td>
                                            </TableRow>
                                            
                                        </tbody>
                                    </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                <Title><strong>PORT3</strong></Title>
                                <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port3Mode" name="osType" value={this.state.Port3Mode} options={["Output","Input"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port3Termination" name="osType" value={this.state.Port3Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        
                                    </tbody>
                                </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                <Title><strong>PORT4</strong></Title>
                                <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port4Mode" name="osType" value={this.state.Port4Mode} options={["Output","Input"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port4Termination" name="osType" value={this.state.Port4Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected}/></td>
                                        </TableRow>
                                        
                                    </tbody>
                                </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                <Title><strong>PORT5</strong></Title>
                                <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port5Mode" name="osType" value={this.state.Port5Mode} options={["Output","Input"]} onChange={this._selected}/></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port5Termination" name="osType" value={this.state.Port5Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        
                                    </tbody>
                                </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                <Title><strong>PORT6</strong></Title>
                                <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port6Mode" name="osType" value={this.state.Port6Mode} options={["Output","Input"]} onChange={this._selected}/></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port6Termination" name="osType" value={this.state.Port6Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        
                                    </tbody>
                                </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                <Title><strong>PORT7</strong></Title>
                                <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port7Mode" name="osType" value={this.state.Port7Mode} options={["Output","Input"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port7Termination" name="osType" value={this.state.Port7Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected}/></td>
                                        </TableRow>
                                        
                                    </tbody>
                                </Table>
                            </Box>
                        </Box>
                        <Box direction='row' align='start' >
                            <Box align='center' pad='small' basis='medium' >
                                <Title><strong>PORT8</strong></Title>
                                <Table>
                                    <tbody>
                                        <TableRow><td><strong>Mode</strong></td>
                                            <td><Select id="Port8Mode" name="osType" value={this.state.Port8Mode} options={["Output","Input"]} onChange={this._selected} /></td>
                                        </TableRow>
                                        <TableRow><td><strong>Termination</strong></td>
                                            <td><Select id="Port8Termination" name="osType" value={this.state.Port8Termination} options={["1V","2V","3V","4V","5V","6V","7V","8V","9V"]} onChange={this._selected}/></td>
                                        </TableRow>
                                        
                                </tbody>
                                </Table>
                            </Box>
                        </Box>
                    </Columns>
                </Section>
                <Footer pad="medium" justify="between">
                    <Button type="submit" primary={true} label='Apply'
                    onClick={this._onSubmit} />

                </Footer>
            </div>
        )
    }
}

const select = state => ({ ...state.optionalcards });

export default connect(select)(Dio);
