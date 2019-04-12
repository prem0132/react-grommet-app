import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App } from 'grommet';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';

import Paragraph from 'grommet/components/Paragraph';
import SyncIcon from 'grommet/components/icons/base/Sync';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { pageLoaded } from '../utils';
import { unloadKill, loadKill } from '../../actions/Administration/kill';



class Secure_Erase extends Component {
    constructor(props){
        super(props);
        // this._kill = this._kill.bind(this);
        // this._killAuthenticate = this._killAuthenticate.bind(this);
        // this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        //console.log('componentDidMount entered')
         pageLoaded('Kill');
         
      }

    //   _onSubmit(fields) {
    //     const { dispatch } = this.props;
    //     dispatch(secureEraseAuthenticate(fields.username, fields.password));
    //   }

      componentWillUnmount() {
        //console.log("componentWillUnMount entered");
          const { dispatch } = this.props;
        //   dispatch(unloadsecureErase());
        }

    render() {
        let message = "This would Erase the system configuration."

        return (
          <Paragraph>
                      
              <Box direction='column' align='start' border={{ color: 'light-3' }} basis='medium' pad='small'>
                  <Title>
                    Secure Erase
                  </Title>
                  {message}
                  <Footer>
                
                <Button type={this.props.accountType== 'admin'? 'button':null} label="Secure Erase" path={this.props.accountType== 'admin'? '/Admin/secureEraseAuthenticate':null}
                //  onClick = {this._kill} 
                />
              </Footer>

              </Box>
          </Paragraph>
        );
      }
    };

const select = state => ({...state.session})
export default connect(select)(Secure_Erase);