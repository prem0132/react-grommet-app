import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Checkbox from 'grommet/components/CheckBox';
import Button from 'grommet/components/Button';

import {loadSessionList, unloadSessionList, deletesession } from '../../actions/Dashboard/session_list';
import { pageLoaded } from '../utils';
import { PropTypes } from 'react-desc';
import store from '../../store';


class SessionList extends Component {
  constructor(props){
    super(props);
    this._disconnectSession = this._disconnectSession.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);
    this.state = {
      selectedsession: [],
      buttonappear: false
    }
  }

  componentDidMount() {
    //console.log('1');
    pageLoaded('SessionList');
    this.props.dispatch(loadSessionList());
  }

  componentWillUnmount(){
    this.props.dispatch(unloadSessionList());
  }

  _disconnectSession(){
    //console.log('delete sessions');
    //console.log('sessions to delete', this.state.selectedsession)
    this.props.dispatch(deletesession(this.state.selectedsession))
  }
  
  _onChangeCheckBox(event){
    //console.log(event.target.checked)
    //console.log(event.target.id)
    if(event.target.checked == false){
      this.state.selectedsession.pop(event.target.id)
    }
    else{
    this.state.selectedsession.push(event.target.id)
    }
    //console.log('selected sessions',this.state)
    if(this.state.selectedsession.length == 0){
      this.setState({buttonappear: false})
    }
    else{
      this.setState({buttonappear: true})
    }
  }


  render() {
     const {sessionList, membersCount, mySession} = this.props;
     //console.log('screen', this.props);
     //console.log(store.getState());

     const sessionData = <TableRow><td>{mySession.UserName}</td><td>{mySession.UserIP}</td><td>{mySession.LoginTime}</td>
         <td>{mySession.AccessTime}</td><td>{mySession.UserExpires}</td><td>{mySession.UserTag}</td></TableRow>

    let disconnectbutton;
    //console.log("length",this.state.selectedsession.length)
    disconnectbutton = <Button label='Disconnect Session' />
    if(this.state.buttonappear == true){
      //console.log("activating button")
      disconnectbutton = <Button label='Disconnect Session' type='submit' onClick = {this._disconnectSession} />
    }
    const sessionListData = sessionList.map((sessionArrList) =>
      <TableRow>
          <td><Checkbox id={sessionArrList.odataId} onChange={this._onChangeCheckBox} disabled={this.props.accountType== 'admin'? false:true}/></td>
          <td>{sessionArrList.UserName}</td>
          <td>{sessionArrList.UserIP}</td>
          <td>{sessionArrList.LoginTime}</td>
          <td>{sessionArrList.AccessTime}</td>
          <td>{sessionArrList.UserExpires}</td>
          <td>{sessionArrList.UserTag}</td>
      </TableRow>
    );


    return ( 
      <Article pad="none" primary={true} full="vertical">

            <Box align='start' flex='true' basis='medium'>
              <Title>Current Session</Title>
            
            <Table>
                <TableHeader labels={['User', 'IP', 'Login time', 'Access time', 'Expires', 'Source']} />
                <tbody>
                        {sessionData}
                </tbody>
            </Table>
            </Box>
            <Box align='start' flex='true' pad='small'>
              <Title>Session List</Title>
            
            <Table>
                <TableHeader labels={['', 'User', 'IP', 'Login time', 'Access time', 'Expires', 'Source']} />
                <tbody>
                      {sessionListData}
                </tbody>
            </Table>
            {disconnectbutton}
            </Box>
      </Article>
        
    );
  }
}


SessionList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string
};

const select = state => ({ ...state.sessionListReducer,...state.session });

export default connect(select)(SessionList);