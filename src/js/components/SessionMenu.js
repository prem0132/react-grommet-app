import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Rest, { headers, buildQuery, processStatus } from 'grommet/utils/Rest';

import {urlPrefix} from '../actions/utils'

import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import UserIcon from 'grommet/components/icons/base/User';
import LockIcon from 'grommet/components/icons/base/Lock';
import UnlockIcon from 'grommet/components/icons/base/Unlock';
import Button from 'grommet/components/Button';
import { logout } from '../actions/session';
import { lock } from '../actions/Lock';


import store from '../store';


class SessionMenu extends Component {
  constructor() {
    super();
    this._onLogout = this._onLogout.bind(this);
    this._onLock = this._onLock.bind(this);
    this._LockStatus = this._LockStatus.bind(this);
    this.state={
      Locked: undefined

    }
  }




  _onLogout(event) {
    const { session } = this.props;
    event.preventDefault();
    this.props.dispatch(logout(session));
  }

  _onLock(event) {
    if (window.confirm("Are you sure you want to Lock the system"))
    {
      this.setState({Locked:!this.state.Locked})
      let patchInput=
          { "Oem" : {"Hpe" : { "Locked" : this.state.Locked } } }
   
          this.props.dispatch(lock(patchInput));
          window.location.href = '/login';
        
    }
    //console.log("onlockevent",this.state.Locked)
  }

  _LockStatus() {
    const uri = '/redfish/v1/Managers/1'
    let _headers = {
      ...headers,
      'X-API-Version': 200,
      'x-auth-token': window.localStorage.token
    }
    const options = { method: 'GET', headers: _headers}
    const data = fetch(`${urlPrefix}${uri}`, options)
    .then(processStatus)
    .then(response => response.json())
    .then(json => {
      //console.log('json',json)
        this.setState({Locked: json.Oem.Hpe.Locked}) 

  })
}



  render() {
    
    const { dropAlign, colorIndex, session: { UserName: user } } = this.props;

    if(this.state.Locked == undefined){
    this._LockStatus()
    }
    const {Locked}=this.state;
    //this.state.Locked = store.getState().lock.Locked
    
    //console.log('state',this.state.Locked)
    
  
    
    return (
      <div>
      <Menu
        icon={<UserIcon />}
        dropAlign={dropAlign}
        colorIndex={colorIndex}
        a11yTitle='Session'
      >
        <Box pad='medium'>
          <Heading tag='h3' margin='none'>{user}</Heading>
        </Box>
        <Anchor href='#' onClick={this._onLogout} label='Logout' />
      </Menu>
      {this.state.Locked == true ? 
         (
          <Menu
            onClick={this._onLock}
            icon={<LockIcon />}
            dropAlign={dropAlign}
            colorIndex={colorIndex}
            a11yTitle='Unlock'
            />   ):(
              <Menu
              onClick={this._onLock}
              icon={<UnlockIcon />}
              dropAlign={dropAlign}
              colorIndex={colorIndex}
              a11yTitle='Lock'
              /> 

         )}
      </div>
    );
  }
}

SessionMenu.defaultProps = {
  colorIndex: undefined,
  dropAlign: undefined,
};

SessionMenu.propTypes = {
  colorIndex: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  dropAlign: Menu.propTypes.dropAlign,
  session: PropTypes.object.isRequired
};

const select = state => ({
  session: state.session,
  UserName: state.session.UserName
});

export default connect(select)(SessionMenu);
