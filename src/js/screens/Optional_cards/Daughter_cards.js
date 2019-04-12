import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, Paragraph, Anchor } from 'grommet';

import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import RadioButton from 'grommet/components/RadioButton';
import Notification from 'grommet/components/Notification';


import Serialport from './Serialport'
import Canbus from './Canbus'
import Dio from './Dio'

import { pageLoaded } from '../utils';
import { loadOptionalCards,unloadOptionalCards } from '../../actions/Optional_cards';


class Daughter_cards extends Component {
    constructor (props) {
        super(props);   
        //this._onChange = this._onChange.bind(this);
        /* this.state = {
           // currentValue: 'none',
            DetectedType: 'CanBus'            
        }; */
      }



      componentDidMount() {
        pageLoaded('Daughter_cards');
        //console.log("componentDidMount entered");
        this.props.dispatch(loadOptionalCards());
       }
    
       componentWillUnmount() {
        const { dispatch } = this.props;
        //console.log("componentWillUnMount entered");
        dispatch(unloadOptionalCards());
      }

/* 
    _onChange (type) {
        //console.log('onchange',type)
        this.setState({ currentValue: type })
      } */


    render() {
        //const {SelectedOption} = this.state;

        // const {DetectedType} = this.props;   //TBD restore after demo.
        let DetectedType;
          
        //console.log('state', this.state)
        //console.log('props', this.props)


        let CardContent;
        if ('SerialPort' === DetectedType) {
                CardContent = (
                <Serialport />
                );
            } else if('CanBus' === DetectedType){
            CardContent = (
                <Canbus />
            
            );
            } else if('DigitalIO'=== DetectedType){
            CardContent = (
                <Dio />
        
            );
            }else {
            CardContent = (
                <Notification state='Daughter Card not found'
                message='No Card Detected'
                size='large'
                timestamp={''}/>
            );
            
        }


        return (
                <Box pad="medium">
                                

                {/* <Header size='large' pad={{ horizontal: 'medium' }}>
                
                        <RadioButton id="none" label="None" name="none"
                        checked={'none'===this.state.currentValue}
                        onChange={this._onChange.bind(this, 'none')} />
                        <RadioButton id="Serial_Port" label="Serial Port" name="Serial_Port"
                        checked={'Serial_Port'===this.state.currentValue}
                        onChange={this._onChange.bind(this, 'Serial_Port')} />
                        <RadioButton id="dio" label="DIO" name="dio"
                        checked={'dio'===this.state.currentValue}
                        onChange={this._onChange.bind(this, 'dio')} />
                        <RadioButton id="canbus" label="Canbus" name="canbus"
                        checked={'canbus'===this.state.currentValue}
                        onChange={this._onChange.bind(this, 'canbus')} />
                    </Header>
                    */}

                                <Section pad="medium">
                                    {CardContent}
                                </Section>
                </Box>
                );
    }
}


Daughter_cards.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  
  
  
  const select = state => ({ ...state.optionalcards });
  
  export default connect(select)(Daughter_cards);