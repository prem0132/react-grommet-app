import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, Footer } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Heading from 'grommet/components/Heading';
import CheckBox from 'grommet/components/CheckBox';
import Button from 'grommet/components/Button';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadWiFiAP,unloadWiFiAP,changewifiapn } from '../../actions/Network/WiFiAP';



class WiFiAp extends Component { 

  constructor(props){
    super(props);        
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);

    this.state = {
      AccessPointEnabled: undefined,
    };
}

    componentDidMount() {
    pageLoaded('WiFiAp');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadWiFiAP());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadWiFiAP());
  }


  _onChange(event){
    if(this.state.IsEnabled == true){
    this.setState({ [event.target.name]: event.target.value});
    }
    else{
        return 0 
    }
}


_onChangeCheckBox(){
  this.setState( { AccessPointEnabled: !this.state.AccessPointEnabled });
}


_onSubmit(){
   let patchdata = {
    "AccessPointEnabled" : this.state.AccessPointEnabled
  }; 

  this.props.dispatch(changewifiapn(patchdata));
}

  render() {  

        if(this.state.AccessPointEnabled == undefined){
          //console.log('if block executed before',this.state)
          this.state.AccessPointEnabled= this.props.AccessPointEnabled
          }
    
    return (   
						
        <div>		
				
					
          <Header size='large' pad={{ horizontal: 'medium' }}>
             
            <Heading tag = 'h5'><strong>WiFi Access Point:   </strong><span></span></Heading>
                             
          </Header>
          <Section pad="medium">

            <CheckBox label='Enable/Disable'
          toggle={true}
          disabled={this.props.accountType== 'admin'? false:true}
          reverse={false}
          checked={this.state.AccessPointEnabled}
        onChange={this._onChangeCheckBox}/>

				</Section>

        <Footer>
        <Button label='Apply'
                            align='center'
                            type={this.props.accountType== 'admin'? 'submit':null}
                            primary={true}
                            onClick={this.props.accountType== 'admin'? this._onSubmit:null} />
                            </Footer>

                </div>
 
    );
  }
}


WiFiAp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};



const select = state => ({ ...state.wifiap,...state.session });

export default connect(select)(WiFiAp);