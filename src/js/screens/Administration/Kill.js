import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App } from 'grommet';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';

import Paragraph from 'grommet/components/Paragraph';
import SyncIcon from 'grommet/components/icons/base/Sync';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { connect } from 'react-redux';

import { pageLoaded } from '../utils';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import { unloadKill, loadKill } from '../../actions/Administration/kill';
// import killAuthenticateForm from '../Administration/killAuthenticateForm'
import store from '../../store';



class Kill extends Component {

    constructor(props){
        super(props);
        this._kill = this._kill.bind(this);
        // this._killAuthenticate = this._killAuthenticate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        //console.log('componentDidMount entered')
         pageLoaded('Kill');
         this.props.dispatch(loadKill());
         //console.log('componenetDidMount');
         //console.log(store.getState());
        // this.props.dispatch(loadfirmware());
      }

    _onSubmit(fields) {
        const { dispatch } = this.props;
        dispatch(killAuthenticate(fields.username, fields.password));
      }

    // _killAuthenticate(){
        
    // }

    componentWillUnmount() {
        //console.log("componentWillUnMount entered");
          const { dispatch } = this.props;
          dispatch(unloadKill());
        }

    _kill(){
        if (window.confirm("Are you sure you want to kill the system"))
        {
            if( !(window.confirm("Do you want to go back and stop the kill process ? ")))
            {
                // this.props.dispatch(_killAuthenticate())
                //console.log('login');
                // <killAuthenticateForm/>
                //console.log('login2');
            }
        }
    }


    render() {
let message = "This would kill the system.\n Only a authorized person can recover the system."
        return (
          <Paragraph>
                      
              <Box direction='column' align='start' border={{ color: 'light-3' }} basis='medium' pad='small'>
                  <Title>
                    Kill the system
                  </Title>
                  {message}

                  <Footer>
                
                <Button type={this.props.accountType== 'admin'? 'button':null} label="Kill" path={this.props.accountType== 'admin'? '/Admin/killAuthenticate':null}
                //  onClick = {this._kill} 
                />
              </Footer>
                  
              </Box>
          </Paragraph>
        );
      }
    };
const select = state => ({...state,...state.session})
export default connect(select)(Kill);