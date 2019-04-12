import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, FormField, Form, Footer } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Heading from 'grommet/components/Heading';
import CheckBox from 'grommet/components/CheckBox';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadLTE,unloadLTE,changelte } from '../../actions/Network/LTE';



class LTE extends Component {  

  constructor(props){
    super(props);        
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);

    this.state = {
      Enabled: undefined,
      APN: undefined,
      IMEI: undefined,
      IMSI: undefined,
      IP: undefined
    };
}

    componentDidMount() {
    pageLoaded('Network LTE');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadLTE());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
   //console.log("componentWillUnMount entered");
    dispatch(unloadLTE());
  }


  _onChange(event){
    if(this.state.Enabled == true){
    this.setState({ [event.target.name]: event.target.value});
    }
    else{
        return 0 
    }
}


_onChangeCheckBox(){
  this.setState( { Enabled: !this.state.Enabled });
}

_onSubmit(){
  let patchdata = {
          "APN": this.state.APN,
          "Enabled": this.state.Enabled
  };
  this.props.dispatch(changelte(patchdata));
}

  render() {  

          if(this.state.Enabled == undefined){
          this.state.Enabled= this.props.Enabled,
          this.state.APN = this.props.APN
          }


      const { IMEI, IMSI, IP } = this.props;

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
                    LTE Configuration
                    </Title>
                </Header>
                <FormFields>

                    <FormField>
                        <CheckBox label='Enable/Disable APN  '
                        toggle={true}
                        disabled={this.props.accountType== 'admin'? false:true}
                        reverse={false}
                        checked={this.state.Enabled}
                        onChange={this._onChangeCheckBox}/>
                    </FormField>
                    <Box> 
                    <FormField label= 'APN'>
                    <input id='APN' name='APN' value={this.state.APN} type='text' onChange={this._onChange} disabled={this.props.accountType== 'admin'? false:true} />
                    </FormField> 
                    <FormField >
                    <TableRow> <td>IMEI:</td> <td>{IMEI}</td> </TableRow>
                    </FormField>
                    <FormField >
                    <TableRow> <td>IMSI:</td> <td>{IMSI}</td> </TableRow>
                    </FormField>
                    <FormField >
                    <TableRow> <td>IP:</td> <td>{IP}</td> </TableRow>
                    </FormField>
                    </Box>
                </FormFields>



                <Footer pad={{"vertical": "medium"}}>
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


LTE.propTypes = {
  dispatch: PropTypes.func.isRequired,

};



const select = state => ({ ...state.lte,...state.session });

export default connect(select)(LTE);
