import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Grommet, App, FormField } from 'grommet';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';

import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import store from '../../store';

import { pageLoaded } from '../utils';
import { loadSummary,unloadSummary } from '../../actions/Network/Summary';
import { changeNetworkGeneral } from '../../actions/Network/General';


class NetworkGeneral extends Component {

    constructor(props){
        super(props);
        //console.log(store.getState());
        
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
            HostName: undefined,
            FQDN: undefined
        };
    }

    componentWillMount() {
        pageLoaded('Network General');
        
        this.state.FQDN= store.getState().network.FQDN;
        this.state.HostName= store.getState().network.HostName
        if (this.state.FQDN.includes(this.state.HostName))
            this.state.FQDN = this.state.FQDN.replace(this.state.HostName + ".", "")
      }

/*!
* Called for every edit. The state changes to hold the edited field
*/
    _onChange(event){
       this.setState({ [event.target.name]: event.target.value});
    }


/*!
* Submit the state for saving
*/ 
    _onSubmit(){
        if(store.getState().network.FQDN !== this.state.FQDN)
        this.state.FQDN = this.state.HostName + "." + this.state.FQDN;
         this.props.dispatch(changeNetworkGeneral(this.state))
    }

  render() {
    
    return (
       //console.log(store.getState());
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
                            Host Name Settings
                        </Title>
                    </Header>
                    
            <FormFields>
                <FormField label="Subsystem Name (Host name)">
                    <input id='HostName' name='HostName' value={this.state.HostName} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                </FormField>
                <FormField label= 'domain name'>
                    <input id='FQDN' name='FQDN' value={this.state.FQDN} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
            </FormFields>
                <Footer pad={{"vertical": "medium"}}>
                    {/* <Box pad='small'> */}
                    {/* No reset in ESC 
                    <Button align='start' label='Reset' type='reset'
                        onClick={this._Reset() }/></Box> */}
                        
                        <Button label='Apply'
                            align='center'                            
                            type={this.props.accountType== 'admin'? 'submit':null}
                            primary={true}
                            onClick={this.props.accountType== 'admin'? this._onSubmit:null} />
                </Footer>
                
                </Section>
                
            </Form>  
        </Box>
    );
  }
}

// NetworkGeneral.propTypes ={
//     HostName: PropTypes.string,
//     FQDN: PropTypes.string,
// }

const select = state => ({ ...state.network,...state.session  });

export default connect(select)(NetworkGeneral);
