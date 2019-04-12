import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadloginsecuritybanner, unloadloginsecuritybanner, changeloginsecuritybanner } from '../../actions/Security/LoginSecurityBanner';


class LoginSecurityBanner extends Component {

    constructor(props){
        super(props);        
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onReset =  this._onReset.bind(this);
        this._onChangeCheckBox = this._onChangeCheckBox.bind(this);

        this.state = {
            IsEnabled: undefined,
            SecurityMessage: undefined,
        };
    }
       
  
     componentDidMount() {
        //console.log('Component did mount begins')
        pageLoaded('LoginSecurityBanner');
        this.props.dispatch(loadloginsecuritybanner());
        //console.log('state :', this.state)
        //console.log('local props in componentDidMount',this.props)
       } 
   
       componentWillUnmount() {
       const { dispatch } = this.props;
       //this.props.dispatch(loadloginsecuritybanner());
       //console.log("componentWillUnMount entered");
       //console.log('storedataonexit', store.getState().loginsecuritybanner.SecurityMessage)
      // alert('byebye');
        dispatch(unloadloginsecuritybanner());
      }


      _onChange(event){
        if(this.state.IsEnabled == true){
        //console.log('events happening ',event.target.name,event.target.value )
        //console.log('states changing ',this.state.IsEnabled, this.state.SecurityMessage )
        this.setState({ [event.target.name]: event.target.value});
        }
        else{
            return 0 
        }
    }

    _onChangeCheckBox(){
        //console.log('this.state.IsEnabled in _onChangeCheckBox before',this.state.IsEnabled)
        this.setState( { IsEnabled: !this.state.IsEnabled });
    }

    _onReset(){
        //console.log('on Reset ',this.state)
        //console.log('store on reset:',store.getState())

        let patchdata = {
                SecurityMessage : this.props.DefaultSecurityMessage,
                IsEnabled: true
        };
        //console.log('patchdata',patchdata)
        //console.log('patchdataSecurityMessage',patchdata.SecurityMessage)
        //alert('stop');
        this.props.dispatch(changeloginsecuritybanner(patchdata));
    }

    _onSubmit(){
        //console.log('this.state.TertiaryDNSServer', this.state.TertiaryDNSServer);
        //console.log('this.state on submit:', this.state)
        //console.log('store on submit:',store.getState())
        let patchdata = {
                SecurityMessage : this.state.SecurityMessage,
                IsEnabled: this.state.IsEnabled
        };

        //console.log('patchdata',patchdata)
        //console.log('patchdataSecurityMessage',patchdata.SecurityMessage)
        //alert('stop');
        this.props.dispatch(changeloginsecuritybanner(patchdata));
    }

    render() {
        //console.log('RENDERRRRRRRRRR')
        
        //console.log('this.state in render:',this.state,'props',this.props)

        if(this.state.IsEnabled == undefined){
            //console.log('if block executed before',this.state)
            this.state.IsEnabled= this.props.IsEnabled,
            this.state.SecurityMessage = this.props.SecurityMessage
            }
        //const { LoginSecurityBanner } = this.props;

        //console.log('this.state in render: FATER',this.state,'props',this.props)

        return (
            <Box justify='center'
                    align='center'
                    pad='small'
                    margin='small'
                    colorIndex='light-1'
                    >
                    <Form pad={{horizontal: 'none'}} size="large" plain={true}>
                        <Section size="large" full="horizontal">
                        
                        
                            <Header>
                                <Title>
                                Login Security Banner Settings
                                </Title>
                            </Header>
                            <FormFields>
                              
                                <FormField>
                                    <CheckBox label='Enable Login Security Banner'
                                        toggle={true}
                                        disabled={this.props.accountType== 'admin'? false:true}
                                        reverse={false}
                                        checked={this.state.IsEnabled}
                                        onChange={this._onChangeCheckBox} />
                                </FormField>
                            </FormFields>
                            
                        </Section>

                        <Section size="large" full='horizontal'>
                        
                            <FormFields>
                              
                            <FormField label= 'Security Message'>
                            <input id='SecurityMessage' name='SecurityMessage' value={this.state.SecurityMessage} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                            </FormField>

                                
                            </FormFields>

                            <Footer pad={{"vertical": "small"}}>
                              
                              <Box pad='none'><Button  label='Use Default Message' type={this.props.accountType== 'admin'? 'submit':null} onClick={this.props.accountType== 'admin'? this._onReset:null}/></Box>
                              <Box pad='small'><Button primary={true} label='Apply' type={this.props.accountType== 'admin'? 'submit':null} onClick={this.props.accountType== 'admin'? this._onSubmit:null}/></Box>
                            </Footer>

                        
                                
                          
                        </Section>
                    </Form>
            </Box>     
        );
    }
}

LoginSecurityBanner.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  
  
  
  const select = state => ({ ...state.loginsecuritybanner,...state.session });
  
  export default connect(select)(LoginSecurityBanner);