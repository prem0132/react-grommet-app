import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Grommet, App, Header } from 'grommet';

import Box from 'grommet/components/Box';
import NumberInput from 'grommet/components/NumberInput';
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

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadaccesssettings, unloadaccesssettings, changeaccesssettings } from '../../actions/Security/AccessSettings';





class AccessSettings extends Component {
  constructor(props){
    super(props);
    //console.log(store.getState());    
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);

    this.state = {
      IsSecureShellChecked: undefined,
      IsWebServerChecked: undefined,
      IsRemoteconsoleChecked: undefined,
      IsVirtualMediaChecked: undefined,
      sshport: undefined,
      websslport: undefined,
      webnonsslport: undefined,
      Name: undefined
    };
}

componentDidMount() {
  pageLoaded('AccessSettings');
  this.props.dispatch(loadaccesssettings());
  //console.log('local props in componentDidMount',this.props,'state',this.state)
  //console.log('store in componentDidMount',store.getState())
}
  

componentWillUnmount() {
  const { dispatch } = this.props;
  //console.log("componentWillUnMount entered, store",store.getState());
  dispatch(unloadaccesssettings());
}

_onChange(event){
  //console.log('id',this.state[event.target.id]);
  
  if(this.state[event.target.id] == true){
  this.setState({ [event.target.name]: event.target.value});
  }
  else{
      return 0 
  }
}

_onChangeCheckBox(event){  
  this.setState({ [event.target.id]: event.target.checked});
  //console.log('this.state:', this.state)
  //console.log('event details:',event.target.id, 'value',event.target.checked);
}


/*!
* Submit the state for saving
*/ 
_onSubmit(){
  //console.log('this.state on submit:', this.state)
          let patchdata = {
            "HTTP": {
              "Port": this.state.sshport,
              "ProtocolEnabled": this.state.IsSecureShellChecked
          },
          "HTTPS": {
              "Port": this.state.websslport,
              "ProtocolEnabled": this.state.IsWebServerChecked
          },
          "Oem": {
              "Hpe": {
                  "Remoteconsole": {
                      "ProtocolEnabled": this.state.IsRemoteconsoleChecked
                  }
              }
          },
          "VirtualMedia": {
              "ProtocolEnabled": this.state.IsVirtualMediaChecked
          }
        };

  //console.log('patchdata',patchdata)
  //console.log('http:',patchdata.HTTP.ProtocolEnabled,'https',patchdata.HTTPS.ProtocolEnabled,'sshport',patchdata.HTTP.Port,'unknown',patchdata.VirtualMedia.Port)
  //alert('stop');
  this.props.dispatch(changeaccesssettings(patchdata))
}

  render() {

    if(this.state.IsSecureShellChecked === undefined){
      //console.log('if block executed before',this.state)
      this.state.IsSecureShellChecked= this.props.HTTP.ProtocolEnabled,
      this.state.IsRemoteconsoleChecked= this.props.Oem.Hpe.RemoteConsole.ProtocolEnabled,
      this.state.IsWebServerChecked= this.props.HTTP.ProtocolEnabled,
      this.state.IsVirtualMediaChecked= this.props.VirtualMedia.ProtocolEnabled,
      this.state.sshport= this.props.HTTP.Port,
      this.state.websslport= this.props.HTTPS.Port,
      this.state.Name= this.props.Name
        };

        //console.log('RENDER')
        //console.log('store in render',store.getState())
        //console.log('this.state in render:',this.state)
        //console.log('this.props',this.props) 
   

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
                            {this.state.Name}
                            </Title>
                        </Header>
                        
                        <FormFields>
                            <FormField>
                              <CheckBox label='Secure Shell(SSH)'
                              id="IsSecureShellChecked"
                              toggle={true}
                              disabled={this.props.accountType== 'admin'? false:true}
                              reverse={false}
                              checked={this.state.IsSecureShellChecked}
                              onChange={this._onChangeCheckBox} />
                            </FormField>
                            <FormField label= 'Secure Shell (SSH) Port'>
                            <input id='IsSecureShellChecked' name='sshport' type="number" hidden={true} value={this.state.sshport} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                            </FormField>
                            <FormField>
                              <CheckBox label='Web Server'
                                id='IsWebServerChecked'
                                toggle={true}
                                disabled={this.props.accountType== 'admin'? false:true}
                                reverse={false}
                                checked={this.state.IsWebServerChecked}
                                onChange={this._onChangeCheckBox} />
                            </FormField>
                            <FormField label= 'Web Server Non-SSL Port'>
                            <input id='IsWebServerChecked' name='webnonsslport' hidden={true} value={this.state.webnonsslport} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                            </FormField>
                            <FormField label= 'Web Server SSL Port'>
                            <input id='IsWebServerChecked' name='websslport' hidden={true} value={this.state.websslport} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                            </FormField>
                            <FormField>
                              <CheckBox label='Remote console'
                                id='IsRemoteconsoleChecked'
                                toggle={true}
                                disabled={this.props.accountType== 'admin'? false:true}
                                reverse={false}
                                checked={this.state.IsRemoteconsoleChecked}
                                onChange={this._onChangeCheckBox} />
                            </FormField>
                            {/* <FormField>
                              <Box pad='small'><label>Remote console Port</label></Box>
                            </FormField> */}
                            <FormField>
                              <CheckBox label='Virtual Media'
                                id = 'IsVirtualMediaChecked'
                                toggle={true}
                                disabled={this.props.accountType== 'admin'? false:true}
                                reverse={false}
                                checked={this.state.IsVirtualMediaChecked}
                                onChange={this._onChangeCheckBox} />
                            </FormField>
                            {/* <FormField>
                              <Box pad='small'><label>Virtual Media Port</label></Box>
                            </FormField> */}
                            {/* <FormField>
                              <CheckBox label='SNMP'
                                toggle={true}
                                disabled={false}
                                reverse={false} />
                            </FormField>
                            <FormField>
                              <Box pad='small'><label>SNMP Port</label></Box>
                            </FormField>
                            <FormField>
                              <Box pad='small'><label>SNMP Trap Port</label></Box>
                            </FormField>
                            <FormField>
                              <CheckBox label='IPMI/DCMI over LAN'
                                toggle={true}
                                disabled={false}
                                reverse={false} />
                            </FormField>
                            <FormField>
                              <Box pad='small'><label>IPMI/DCMI over LAN Port</label></Box>
                            </FormField> */}
                        </FormFields>
                        <Footer pad={{"vertical": "medium"}}>
                            
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

AccessSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  HTTP: PropTypes.object,
  HTTPS: PropTypes.object,
  VirtualMedia: PropTypes.object,
  Oem: PropTypes.object,
};



const select = state => ({ ...state.accesssettings,...state.session });

export default connect(select)(AccessSettings);
