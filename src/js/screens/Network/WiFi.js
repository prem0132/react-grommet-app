import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, List, Label } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import RssIcon from 'grommet/components/icons/base/Rss';
import Heading from 'grommet/components/Heading';
import CheckBox from 'grommet/components/CheckBox';
import Button from 'grommet/components/Button';
import ListItem from 'grommet/components/ListItem';
import Select from 'grommet/components/Select';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import LayerForm from 'grommet-templates/components/LayerForm';
import Form from 'grommet/components/Form';
import Layer from 'grommet/components/Layer';
import FormField from 'grommet/components/FormField';
import TableHeader from 'grommet/components/TableHeader';
import CloseIcon from 'grommet/components/icons/base/Close';
import Footer from 'grommet/components/Footer';
import RadioButton from 'grommet/components/RadioButton';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Spinning from 'grommet/components/icons/Spinning';

import Rest, { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

import {urlPrefix} from '../../actions/utils'
import store from '../../store';
import { pageLoaded } from '../utils';
import { loadWiFi, unloadWiFi, loadconfiguredwifi, deleteconfiguredwifi, changewificonfig } from '../../actions/Network/WiFi';

class WiFi extends Component { 
  constructor () {
    super();
    //this._onToggle = this._onToggle.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onDeselect = this._onDeselect.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);
    this._onChange = this._onChange.bind(this);
    this._selected = this._selected.bind(this);
    this._onConfigSubmit = this._onConfigSubmit.bind(this);
    this._onConfigChangeCheckBox  = this._onConfigChangeCheckBox.bind(this);
    this._scanwifi = this._scanwifi.bind(this);
    this.state = {
      scanwifi: true,
      matchfoundat: undefined,
      scannedwifi: [],
      selectedwifi: undefined,
      selectedwifidata: undefined,
      selectedwificonfigureddata: {},
      matchfound: false,
      selectedRow: false,
      EnablingWiFi: false
    }
  }
  
  componentDidMount() {
    pageLoaded('WiFi');
    //console.log("componentDidMount entered");
    //this.props.dispatch(loadWiFi());
    this.props.dispatch(loadconfiguredwifi());
    
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadWiFi());
  } 

  _scanwifi(){
    const uri = '/redfish/v1/Managers/1/WifiInterfaces/1/Actions/WifiInterface.Scan'
    //console.log("Scanning")
    let _headers = {
      ...headers,
      'X-API-Version': 200,
      'x-auth-token': window.localStorage.token
    };
    const options = { method: 'POST', headers: _headers}
    const data = fetch(`${urlPrefix}${uri}`, options)
    .then(processStatus)
    .then(response => response.json())
    .then(json => {
        this.setState({ scannedwifi: json});
      }
    );
    //console.log("time to set state")
    //this.setState({ scannedwifi: json})
    //console.log("okay")
    this.setState({ scanwifi: false})
  }

  _onClick (event) {   
    const temparray = this.state.scannedwifi
    const configuredwifiarray = this.props.configuredwifiarray
    for(var i = 0; i < temparray.length; i++) {
      if(temparray[i].SSID == event.target.name) {  
      //console.log('selectedwifidata', temparray[i])
      this.setState({selectedwifidata: temparray[i]})        
      }
  } 

  for(var i = 0; i < configuredwifiarray.length; i++) {
    if(configuredwifiarray[i].SSID == event.target.name) {  
    //console.log('configuredwifiarray match', configuredwifiarray[i])
    this.setState({selectedwificonfigureddata: configuredwifiarray[i]})
    //this.setState({matchfound: true})
    this.state.matchfound = true
    this.setState({matchfoundat: configuredwifiarray[i].ID})
    }
} 

    if(this.state.matchfound == false){
      //console.log('MATCH NOT FOUND IN CONFIGURED ARRAY LIST')
      this.state.selectedwificonfigureddata = {        
          "AnonymousIdentity": null,
          "CACertFile": null,
          "Description": "Configured Wifi Network",
          "EAP": null,
          "Enabled": null,
          "Hidden": null,
          "ID": null,
          "Identity": null,
          "Passphrase": null,
          "Phase2": null,
          "PrivateKeyFile": null,
          "PrivateKeyPassphrase": null,
          "SSID": event.target.name,
          "Security": null
      
      }
    
    }


    this.setState({selectedwifi: event.target.name})
    if(this.state.EnablingWiFi == false){
    this.setState({ selectedRow: true });
    }
    this.setState({EnablingWiFi : false})
    //console.log('test',event.target.name, 'state', this.state)   
  }

  _onDeselect () {
    this.setState({ selectedRow: false });
    this.setState({selectedwifi: undefined})
    this.setState({selectedwifidata: undefined})
    this.setState({selectedwificonfigureddata: undefined})
    this.setState({matchfound: false})
    this.setState({matchfoundat: undefined})
  }

 
  _onConfigChangeCheckBox(event){  
    //console.log('event details:_onConfigChangeCheckBox',event.target.id, event.target.checked);
    const temparray = this.state.selectedwificonfigureddata
    //console.log('temparray_onConfigChangeCheckBox',temparray)
    if(this.state.EnablingWiFi == false){
    temparray[event.target.id] = event.target.checked
    this.setState( { selectedwificonfigureddata: temparray});
    }
    else{
      temparray["Enabled"] = event.target.checked
      this.setState( { selectedwificonfigureddata: temparray});
    }
  }
  

  _onChangeCheckBox(event){  
    const temparray = this.state.scannedwifi
    
    //console.log('temparray', temparray)
     for(var i = 0; i < temparray.length; i++) {
      if(temparray[i].SSID == event.target.id) {  
        temparray[i].Enabled = !temparray[i].Enabled
        //console.log('Test Object',temparray[i].Enabled)
      }
  } 
    this.setState({scannedwifi: temparray})
    //console.log('temparray', temparray)
    //console.log('this.state:', this.state)
    //console.log('EVENT DETAILS ID',event.target.id, 'value',event.target.checked,'name',event.target.name);
    this.state.EnablingWiFi = true
    this._onClick(event);
    this._onConfigChangeCheckBox(event);
    this._onConfigSubmit()
    this.setState({scanwifi: true})
  }


  _onChange(event){
    //console.log('event details:',event.target.name, event.target.value);
    //this.setState({ [event.target.name]: event.target.value});
    const temparray = this.state.selectedwificonfigureddata
    temparray[event.target.name] = event.target.value
    //console.log('temparray',temparray)
    this.setState( { selectedwificonfigureddata: temparray});
}

  _selected(option){
    //console.log('_selected(option)',option.option,option.target.name)
    const temparray = this.state.selectedwificonfigureddata
    temparray[option.target.name] = option.option
    //console.log('temparray',temparray)
    this.setState( { selectedwificonfigureddata: temparray});
}

_onConfigSubmit(){
  //console.log('Submitting',this.state.selectedwificonfigureddata)
  //console.log('match index',this.state.matchfoundat)
  //alert('STOP')
  this.props.dispatch(changewificonfig(this.state.selectedwificonfigureddata,this.state.matchfoundat))
  this.setState({scanwifi: true})
}

_onDelete(ssid){
  //console.log('id',ssid)
  const configuredwifiarray = this.props.configuredwifiarray
    for(var i = 0; i < configuredwifiarray.length; i++) {
      if(configuredwifiarray[i].SSID == ssid) {  
        this.props.dispatch(deleteconfiguredwifi(configuredwifiarray[i].ID))  
        //console.log('deleting at ',configuredwifiarray[i].ID)
        //alert('STOP')
      }
  } 
  this.setState({scanwifi: true})
}


render() { 
  //console.log('this.state: RENDER', this.state)
  const { selectedRow, id  } = this.state;
  const { configuredwifiarray  } = this.props;

  if(this.state.scanwifi == true){
    //console.log("ScANNING WIFI")
    this._scanwifi()
  } 

  if(this.state.scannedwifi.length == 0){
    //console.log("length is ",this.state.scannedwifi.length)
    return(
      <Box>
        <Header><h4><Spinning />SCANNING WIFI</h4></Header>
        </Box>
    )
  }





  

  const wifinetworks = this.state.scannedwifi.map((wifinetwork) =>{
    //console.log('wifi mapping')
    let deletebox;
    if(wifinetwork.Configured == true){
      deletebox = (<Button id={wifinetwork.SSID} icon={<TrashIcon />} onClick={this.props.accountType== 'admin'? this._onDelete.bind(this,wifinetwork.SSID):null}/>)
    }
      return(
      <TableRow>
          <td>
          <Box pad={{between: 'small'}} >
          <RadioButton
            name={wifinetwork.SSID}
            label={wifinetwork.SSID}
            disabled={this.props.accountType== 'admin'? false:true}
            checked={false}
            onChange={this._onClick} />
            </Box>
          </td>
          <td>
                {wifinetwork.Security}
          </td>     
          <td><RssIcon/>{wifinetwork.Strength}</td>
          <td>
              <CheckBox id={wifinetwork.SSID} 
                        disabled={this.props.accountType== 'admin'? false:true}
                        label='' 
                        toggle={true} 
                        name={wifinetwork.SSID}
                        checked={wifinetwork.Enabled}
                        onChange={this._onChangeCheckBox} />
          </td>
          <td>
          <CheckBox     name={wifinetwork.SSID}
                        disabled={this.props.accountType== 'admin'? false:true}
                        label='' 
                        toggle={true} 
                        checked={wifinetwork.Configured}
                        onChange={this._onClick} />
          </td>
          <td>{deletebox}</td>
      </TableRow>

   ) });
    

   let LayerItem;
   
   //console.log('this.state: layeritem', this.state)

   if (selectedRow === true) {
    
    LayerItem = (
      
     
      <Layer align="center" closer={true} onClose={this._onDeselect}
        >
         
         <Article pad={{vertical: 'medium', between: 'medium'}} > 
        <Form >
        <Header><Title>{this.state.selectedwifi}</Title></Header>
        <fieldset>
        <FormField label="SSID" htmlFor="name">
            <input id="name" name={"name"} type="text"
              value={this.state.selectedwifi} disabled={this.props.accountType== 'admin'? false:true} />
          </FormField>
          
          <FormField label="Hidden">
          <Select id="Hidden" name="Hidden"
            placeHolder={this.state.selectedwificonfigureddata.Hidden}
            value={this.props.accountType== 'admin'? this.state.selectedwificonfigureddata.Hidden:null}
             options={this.props.accountType== 'admin'? ['true','false']:null}
             onChange={this._selected}
           />
          </FormField>
          
          <FormField label="Security" >
          <Select id="Security" name="Security"
            placeHolder={this.state.selectedwificonfigureddata.Security}
            value={this.props.accountType== 'admin'?this.state.selectedwificonfigureddata.Security:null}
             options={this.props.accountType== 'admin'?['eap', 'psk', 'none']:null}
              onChange={this._selected}
           />
          </FormField>
          
          <FormField htmlFor="password" label="Password"
            >
            <input id="Passphrase" name="Passphrase" type="password"
              disabled={this.props.accountType== 'admin'? false:true}
              defaultValue=""              
              value={this.state.selectedwificonfigureddata.Passphrase}
              onChange={this._onChange} />
          </FormField>
          <FormField label="EAP" >
          <Select id="EAP" name="EAP"
          placeHolder={this.state.selectedwificonfigureddata.EAP}
            value={this.props.accountType== 'admin'? this.state.selectedwificonfigureddata.EAP:null}
             options={this.props.accountType== 'admin'?['TLS','TTLS','PEAP']:null}
              onChange={this._selected}
           />
          </FormField>
          <FormField label="Identity" htmlFor="name">
            <input id="Identity" 
                    name="Identity"
                    disabled={this.props.accountType== 'admin'? false:true} 
                    type="text"
                    value={this.state.selectedwificonfigureddata.Identity}
                    defaultValue=""
                    onChange={this._onChange} />
          </FormField>

          <FormField label="Anonymous Identity" htmlFor="name">
            <input id="AnonymousIdentity" 
            name="AnonymousIdentity" 
            type="text"
            disabled={this.props.accountType== 'admin'? false:true}
              value={this.state.selectedwificonfigureddata.AnonymousIdentity}
              defaultValue=""
              onChange={this._onChange} />
          </FormField>

        {/*  <FormField label="CA-CERT" htmlFor="file" >
            <input ref="file" id="file" name="file" type="file" />
          </FormField>
                    

          <FormField label="private-key" htmlFor="file" >
            <input ref="file" id="file" name="file" type="file" />
          </FormField>
    */}
          <FormField htmlFor="" label="CA-CERT"
            >
            <input id="CACertFile" name="CACertFile" type="text"
            disabled={this.props.accountType== 'admin'? false:true}
              value={this.state.selectedwificonfigureddata.CACertFile}
              onChange={this._onChange} />
          </FormField>

          <FormField htmlFor="" label="Private Key File"
            >
            <input id="PrivateKeyFile" name="PrivateKeyFile" type="text"
            disabled={this.props.accountType== 'admin'? false:true}
              value={this.state.selectedwificonfigureddata.PrivateKeyFile}
              onChange={this._onChange} />
          </FormField>


          <FormField htmlFor="password" label="Private Key Passphrase"
            >
            <input id="PrivateKeyPassphrase" name="PrivateKeyPassphrase" type="password"
            disabled={this.props.accountType== 'admin'? false:true}
              value={this.state.selectedwificonfigureddata.PrivateKeyPassphrase}
              onChange={this._onChange} />
          </FormField>

         {/* <FormField label="Priority" htmlFor="name">
            <input id="name" name={"name"} type="text"
              defaultValue="" />
          </FormField>
    */}

          <FormField label="Phase 2" >
          <Select id="Phase2" name="Phase2"
          placeHolder={this.state.selectedwificonfigureddata.Phase2}
            value={this.props.accountType== 'admin'? this.state.selectedwificonfigureddata.Phase2:null}
             options={this.props.accountType== 'admin'? ['MD5', 'TLS', 'MSCHAPV2', 'PEAP', 'TTLS', 'GTC', 'OTP', 'LEAP', 'AKA', 'FAST', 'PAX', 'SAKE', 'GPSK', 'WSC', 'IKEV2', 'TNC']:null}
              onChange={this._selected}
           />
          </FormField>
          <FormField label="" >
          <CheckBox id="Enabled" 
                    label='Enable/Disable'
                    disabled={this.props.accountType== 'admin'? false:true} 
                    toggle={true}
                    checked={this.state.selectedwificonfigureddata.Enabled}
                    onChange={this._onConfigChangeCheckBox}/>
           </FormField>
        </fieldset>
        
        <Footer>
          <Button primary={true} type={this.props.accountType== 'admin'? 'submit':null} label="Apply"
            onClick={this.props.accountType== 'admin'? this._onConfigSubmit:null} />
        </Footer>
        </Form>
        </Article>
      </Layer>
    );
  } 

    //console.log('state of the store',store.getState())
    //console.log('selectedwificonfigureddata',this.state.selectedwificonfigureddata)
    //console.log('state of the props',configuredwifiarray)
      
    return (   

      <Box flex={true}>
        
        <Section pad="medium"> 
              <Box justify='start' direction="row">       
              <Title>Available WIFI </Title>
              </Box>
              <Box justify='end' direction="row">
                <Button primary={true} align='end' label='Scan' onClick={this.props.accountType== 'admin'? this._scanwifi:null}/>
              </Box>
              
  
            <Table selectable={false}  >
              <thead>
                <tr>
                  <th>
                  SSID
                  </th>
                  <th>
                  Security
                  </th>
                  <th>
                  Strength
                  </th>
                  <th>
                  Enable/Disable
                  </th>
                  <th>
                  Configured
                  </th>
                  <th>
                  Remove
                  </th>
                </tr>
              </thead>
              <tbody>
              {wifinetworks}
              </tbody>
              {LayerItem}
            </Table>
          </Section>   
        </Box>         
    );
  }
}


WiFi.propTypes = {
  dispatch: PropTypes.func.isRequired,
};



const select = state => ({ ...state.wifi });

export default connect(select)(WiFi);
