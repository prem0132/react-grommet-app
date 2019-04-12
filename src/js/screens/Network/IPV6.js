import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
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

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadSummary,unloadSummary } from '../../actions/Network/Summary';
import { changeNetworkIPV6 } from '../../actions/Network/IPV6';


class IPV6 extends Component {
    constructor(props){
        super(props);        
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        //this._onDNSSubmit = this._onDNSSubmit.bind(this);
        this._onChangeCheckBox = this._onChangeCheckBox.bind(this);
        this.state = {
            clientprecendencestatus: undefined,
            Autoconfig: undefined,
            clientprecendence: undefined,
            AddressOrigin: undefined,
            IPv6DefaultGateway: undefined,
            IPv6StaticAddressPrefixLength: undefined,
            IPv6StaticAddressAddress: undefined,
            PrimaryDNSServer : undefined,
            SecondaryDNSServer : undefined,
            TertiaryDNSServer : undefined
        };
    }

    componentWillMount() {
        pageLoaded('Network IPV6');
		this.state.clientprecendence= store.getState().network.IPV6clientprecendence;        this.state.AddressOrigin= store.getState().network.IPV6AddressOrigin;
        this.state.PrimaryDNSServer = store.getState().network.NameServers[0]
        this.state.SecondaryDNSServer = store.getState().network.NameServers[1]
        this.state.TertiaryDNSServer = store.getState().network.NameServers[2]
        this.state.IPv6DefaultGateway = store.getState().network.IPv6DefaultGateway
        this.state.IPv6StaticAddressPrefixLength = store.getState().network.IPv6StaticAddresses[0].PrefixLength
        this.state.IPv6StaticAddressAddress = store.getState().network.IPv6StaticAddresses[0].Address

        if (this.props.IPV6AddressOrigin == 'auto'){
            //console.log('inside if')
          this.state.Autoconfig = true 
            }  else {
                this.state.Autoconfig = false
            } 
        //console.log('propsIPV6clientprecendence',this.props.IPV6clientprecendence)
        if (this.props.IPV6clientprecendence == 100){
            //console.log('inside if')
             this.state.clientprecendencestatus = true 
                }  else {
                   //console.log('inside else')
                     this.state.clientprecendencestatus = false 
                } 
      }

      _onChangeCheckBox(event){  
        this.setState({ [event.target.id]: event.target.checked});
        //console.log('this.state:', this.state)
        //console.log('event details:',event.target.id, 'value',event.target.checked);
      }

      _onChange(event){
        //console.log('event details:',event.target.name, event.target.value);
        if(this.state.Autoconfig == false){
        this.setState({ [event.target.name]: event.target.value});
        }
        else{
            return 0 
        }
    }

      _onSubmit(){

        if (this.state.Autoconfig == true){
             this.state.AddressOrigin = 'auto' 
              }  else {
                  this.state.AddressOrigin = 'static' 
              } 
   
          if (this.state.clientprecendencestatus == false){
               this.state.clientprecendence = 35 
                  }  else {
                      this.state.clientprecendence = 100 
                  } 

        //console.log('patchdata broken',this.state.AddressOrigin,this.state.clientprecendence)
        let patchData;
        if(this.state.Autoconfig === true){

            patchData = 
            {
                "IPv6AddressPolicyTable": {
                    "Precedence": this.state.clientprecendence
                    },
                    "Oem": {
                    "Hpe": {
                            "IPv6": { "AddressOrigin":  this.state.AddressOrigin }
                            }
                        },
                        "NameServers": [
                            this.state.PrimaryDNSServer,
                            this.state.SecondaryDNSServer,
                            this.state.TertiaryDNSServer
                ]
                    }
        }
        else{
            patchData = {
                "IPv6AddressPolicyTable": {
                    "Precedence": this.state.clientprecendence
                    },
                "Oem": {
                    "Hpe": {
                            "IPv6": { "AddressOrigin":  this.state.AddressOrigin }
                        }
                    },
                    "IPv6StaticAddresses": [
                        {
                            "Address": this.state.IPv6StaticAddressAddress,
                            "PrefixLength": this.state.IPv6StaticAddressPrefixLength
                        } ],
                "IPv6DefaultGateway" : this.state.IPv6DefaultGateway
            }
        }
                
               

    //console.log('patchdata precedence',patchdata.IPv6AddressPolicyTable.Precedence,'NameServer',patchdata.NameServers[2],'Address Origin', patchdata.Oem.Hpe.IPv6.AddressOrigin)
    // alert('stop')
  this.props.dispatch(changeNetworkIPV6(patchData))
}

/* _onDNSSubmit(){
      let patchdata = { NameServers: [
        this.state.PrimaryDNSServer,
        this.state.SecondaryDNSServer,
        this.state.TertiaryDNSServer
    ]
    };
//console.log('patchdata broken',patchdata.NameServers[1])
//console.log('patchdata',patchdata)
alert('stop')
this.props.dispatch(changeNetworkIPV6(patchdata))
} */


  render() {

    //console.log('state',this.state)

   

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
                    Global IPv6 Configuration
                    </Title>
                </Header>
                
                <FormFields>
                    <FormField>
                    <CheckBox label='Client Applications use IPv6 first'
                    id="clientprecendencestatus"
                    toggle={true}
                    disabled={this.props.accountType== 'admin'? false:true}
                    reverse={false}
                    checked={this.state.clientprecendencestatus}
                    onChange={this._onChangeCheckBox} />
                    </FormField>
                   {/*} <FormField>
                    <CheckBox label='Enable Stateless Address Auto Configuration (SLAAC)'
                    toggle={true}
                    disabled={false}
                    reverse={false} />
                    </FormField> */}
                </FormFields>
                
            </Section>
            <Section>
                <Header>
                    <Title>
                    IPv6 Configuration
                    </Title>
                </Header>
                <FormFields>
                 {/*}   <FormField>
                        <CheckBox label='Enable Stateless Address Auto Configuration (SLAAC)'
                        toggle={true}
                        disabled={false}
                        reverse={false} />
                    </FormField>
                    <FormField>
                        <CheckBox label='Use DHCPv6 Rapid Commit'
                        disabled={false}
                        reverse={false} />
                    </FormField>
                */}
                    <FormField>
                        <CheckBox label='Enable IPv6 in Auto Mode'
                        id="Autoconfig"
                        toggle={true}
                        disabled={this.props.accountType== 'admin'? false:true}
                        reverse={false}
                        checked={this.state.Autoconfig}
                        onChange={this._onChangeCheckBox} />
                    </FormField>
                    <Box> 
                    <FormField label= 'IPv6StaticAddress'>
                    <input id='IPv6StaticAddressAddress' name='IPv6StaticAddressAddress' hidden={true} value={this.state.IPv6StaticAddressAddress} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    <FormField label= 'IPv6StaticAddress PrefixLength'>
                    <input id='IPv6StaticAddressPrefixLength' name='IPv6StaticAddressPrefixLength' value={this.state.IPv6StaticAddressPrefixLength} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    <FormField label= 'IPv6DefaultGateway'>
                    <input id='IPv6DefaultGateway' name='IPv6DefaultGateway' value={this.state.IPv6DefaultGateway} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    </Box>
                </FormFields>



               {/*   <Footer pad={{"vertical": "medium"}}>
              <Box pad='small'>
                        <Button 
                        align='start' 
                        label='Reset ESC' 
                        type='reset' 
                        />
            </Box> 
                    <span/>
                    <Button label='Apply'
                            align='center'
                            type='submit'
                            primary={true}
                            onClick={this._onSubmit} />
                </Footer> */}
            </Section>

                            <Section>
                    <Header>
                        <Title>
                        DNS Configuration
                        </Title>
                    </Header>
                    <FormFields>
                    <Box>
                    <FormField label= 'Primary DNS Server'>
                    <input id='PrimaryDNSServer' name='PrimaryDNSServer' value={this.state.PrimaryDNSServer} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    <FormField label= 'Secondary DNS Server'>
                    <input id='SecondaryDNSServer' name='SecondaryDNSServer' value={this.state.SecondaryDNSServer} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    <FormField label= 'Tertiary DNS Server'>
                    <input id='TertiaryDNSServer' name='TertiaryDNSServer' value={this.state.TertiaryDNSServer} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    </Box>
                    </FormFields>

                    <Footer pad={{"vertical": "medium"}}>
               {/*}     <Box pad='small'>
                        <Button 
                        align='start' label='Reset' type='reset' />
                </Box> */}
                        <span/>
                        <Button label='Apply'
                            align='center'
                            type={this.props.accountType== 'admin'? 'submit':null}
                            primary={true}                           
                            onClick={this.props.accountType== 'admin'? this._onSubmit:null} />
                    </Footer>
                    
                </Section>


            {/*   <Section>
                <Header>
                    <Title>
                    DNS Configuration
                    </Title>
                </Header>
                <FormFields>
                  
                    <FormField><TextInput id='item1' name='item-1' value='Primary DNS Server'/></FormField>
                    <FormField><TextInput id='item2' name='item-2' value='Secondary DNS Server'/></FormField>
                    <FormField><TextInput id='item3' name='item-3' value='Tertiary DNS Server'/></FormField>
                    <FormField>
                    <CheckBox label='Enable DDNS Server Registration'
                    toggle={true}
                    disabled={false}
                    reverse={false} />
                    </FormField>
                
                </FormFields>

                <Footer pad={{"vertical": "medium"}}>
                <Box pad='small'><Button align='start' label='Reset ESC' type='reset' /></Box>
                    <span/>
                    <Button label='Apply'
                        align='center'
                        type='submit'
                        primary={true}
                        onClick='' />
                </Footer>
                
            </Section>
            */}

        </Form>  
    </Box>
   
    );
  }
}

IPV6.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  
  
  
  const select = state => ({ ...state.network,...state.session });
  
  export default connect(select)(IPV6);
