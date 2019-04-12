import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, FormField } from 'grommet';

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


import store from '../../store';
import { pageLoaded } from '../utils';
import { loadSummary,unloadSummary } from '../../actions/Network/Summary';
import { changeNetworkIPV4 } from '../../actions/Network/IPV4';



class IPV4 extends Component {

    constructor(props){
        super(props);
        //console.log(store.getState());
        
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onChangeCheckBox = this._onChangeCheckBox.bind(this);

        this.state = {
            IsChecked: true,
            AddressOrigin: undefined,
            Address: undefined,
            SubnetMask: undefined,
            Gateway: undefined,
            PrimaryDNSServer : undefined,
            SecondaryDNSServer : undefined,
            TertiaryDNSServer : undefined
        };
    }

    componentWillMount() {
        pageLoaded('Network IPV4');
        this.state.AddressOrigin = store.getState().network.IPv4Addresses.AddressOrigin;
        this.state.Address= store.getState().network.IPv4Addresses.Address;
        this.state.SubnetMask= store.getState().network.IPv4Addresses.SubnetMask;
        this.state.Gateway= store.getState().network.IPv4Addresses.Gateway 
        this.state.PrimaryDNSServer = store.getState().network.NameServers[0]
        this.state.SecondaryDNSServer = store.getState().network.NameServers[1]
        this.state.TertiaryDNSServer = store.getState().network.NameServers[2]
        if (store.getState().network.IPv4Addresses.AddressOrigin == 'dhcp'){
          return ( this.state.IsChecked = true );
            }  else {
                return ( this.state.IsChecked = false );
            } 
 
        
        //console.log('this.state: in CWM before',this.state)

        //console.log('this.state.IsChecked',this.state.IsChecked)
        //console.log('this.state: in CWM',this.state)
      }


    /*!
    * Called for every edit. The state changes to hold the edited field
    */
    _onChange(event){
        //console.log('event details:',event.target.name, event.target.value);
        if(this.state.IsChecked == false){
        this.setState({ [event.target.name]: event.target.value});
        }
        else{
            return 0 
        }
    }

    _onChangeCheckBox(){
        //console.log('event details:',event.target.name, event.target.value);
        //console.log('this.state.IsChecked',this.state.IsChecked)
        this.setState( this.state.IsChecked= !this.state.IsChecked);
    }
    /*!
    * Submit the state for saving
    */ 
    _onSubmit(){
        if (this.state.IsChecked == true){
            this.state.AddressOrigin = 'dhcp' 
             }  else {
                 this.state.AddressOrigin = 'static' 
             } 

        //console.log('this.state.TertiaryDNSServer', this.state.TertiaryDNSServer);
        //console.log('this.state on submit:', this.state)
        let patchdata = {
                "IPv4Addresses" : {
                "AddressOrigin":  this.state.AddressOrigin, 
                "Address" : this.state.Address,
                "SubnetMask": this.state.SubnetMask,
                "Gateway": this.state.Gateway
            },
            "NameServers": [
            this.state.PrimaryDNSServer,
            this.state.SecondaryDNSServer,
            this.state.TertiaryDNSServer
            ]
        };

        //console.log('patchdata',patchdata)
        // alert('stop');
        this.props.dispatch(changeNetworkIPV4(patchdata))
    }
    


  render() {

    //const {IPv6Addresses, IPv4Addresses, IPv6AddressPolicyTable, NameServers } = this.props;
    //console.log(MACAddress, HostName, FQDN, PermanentMACAddress, Name,  IPv6DefaultGateway, SpeedMbps, IPv6Addresses, IPv4Addresses, IPv6AddressPolicyTable, NameServers)
    //console.log('this.state in render:',this.state)
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
                        DHCPv4 Configuration
                        </Title>
                    </Header>
                    
                    <FormFields>
                    <FormField>
                    <CheckBox label='Enable DHCPv4'
                    toggle={true}
                    disabled={this.props.accountType== 'admin'? false:true}
                    reverse={false}
                    checked={this.state.IsChecked}
                    onChange={this._onChangeCheckBox}/>
                    {/* NO individual configs under DHCPv4
                    </FormField>
                    <FormField>
                    <CheckBox label='Use DHCPv4 Supplied Gateway' />
                    <CheckBox label='Use DHCPv4 Supplied Static Routes' />
                    <CheckBox label='Use DHCPv4 Supplied Domain Name' /> */}
                    </FormField> 
                    </FormFields>
                    
                </Section>
                <Section>
                    <Header>
                        <Title> 
                        IPv4 Address Configuration
                        </Title>
                    </Header>
                    <FormFields>
                    <Box> 
                    <FormField label= 'IPV4 Address'>
                    <input id='Address' name='Address' hidden={true} value={this.state.Address} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    <FormField label= 'IPV4 SubnetMask'>
                    <input id='SubnetMask' name='SubnetMask' value={this.state.SubnetMask} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true}/>
                    </FormField>
                    <FormField label= 'IPV4 Gateway'>
                    <input id='Gateway' name='Gateway' value={this.state.Gateway} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField>
                    </Box>
                    </FormFields>
                    
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
            </Form>  
        </Box>
        );
  }
}

IPV4.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  
  
  
  const select = state => ({ ...state.network,...state.session  });
  
  export default connect(select)(IPV4);


