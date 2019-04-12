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
import { loadOptionalCards,unloadOptionalCards,changeSerialPortSettings } from '../../actions/Optional_cards';

class Canbus extends Component {
    constructor(props){
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._selected = this._selected.bind(this);
        this.state = {
            Port1Termination: undefined,
            Port2Termination: undefined,
        };
    }

    componentWillMount() {
        pageLoaded('Canbus');
        this.state.Port1Termination= store.getState().optionalcards.Canbus.Port1.Termination;
        this.state.Port2Termination= store.getState().optionalcards.Canbus.Port2.Termination;
    }
    
      _onSubmit(){
        let patchdata = {
                "CanBus": {
                   "Port1": {
                        "Termination": this.state.Port1Termination
                    },
                    "Port2": {
                        "Termination": this.state.Port2Termination
                    }
                }
        }

        this.props.dispatch(changeSerialPortSettings(patchdata))
        window.location = '/Optional_Cards'
    }


    _selected(option){
        //console.log('_selected(option)',option.option,option.target.name,option.target.id)
        this.setState({ [option.target.id] : option.option })
    }

render(){
    //console.log('store', store.getState())
    
    return(


            <div>
                <Header size="small" justify="between" >
                    <Title>Dual CAN Port Daughter Card</Title>
                </Header>
                <Section>
                    <Heading tag = 'h5'><strong>Model:   </strong><span>{this.props.Canbus.Model}</span></Heading>
                    <Heading tag = 'h5'><strong>Serial Number:   </strong><span>{this.props.Canbus.SerialNumber}</span></Heading>
                    <Box direction='row' align='start' >
                        <Box align='center' pad='small' basis='medium' >
                            <Title><strong>PORT1</strong></Title>
                            <Table>
                                <tbody>
                                    <TableRow><td><strong>Termination</strong></td>
                                        <td><Select id="Port1Termination" name="osType" value={this.state.Port1Termination} options={["Disabled","Enabled"]} onChange={this._selected} /></td>
                                    </TableRow>
                                        
                                </tbody>
                            </Table>
                        </Box>
                        <Box pad='small' align='center'>
                            <Title><strong>PORT2</strong></Title>
                            <Table>
                                <tbody>
                                    <TableRow><td><strong>Termination</strong></td>
                                        <td><Select id="Port2Termination" name="osType" value={this.state.Port2Termination}  options={["Disabled","Enabled"]} onChange={this._selected} /></td>
                                    </TableRow>                        
                                </tbody>
                            </Table>
                        </Box>
                    </Box>
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

export default connect(select)(Canbus);
