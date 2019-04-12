import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Title from 'grommet/components/Title';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import Section from 'grommet/components/Section';
import NavControl from '../components/NavControl';
import SessionList from './dashboard/Session_List';
import Diagnostics from './dashboard/Diagnostics';
import Logs from './dashboard/Logs';
import Overview from './dashboard/Overview';

//import PowerIcon from 'grommet/components/icons/base/Power';

import {
  loadDashboard, unloadDashboard
} from '../actions/Dashboard/dashboard';

import { pageLoaded } from './utils';

class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadDashboard());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadDashboard());
  }

  render() {

    const { intl } = this.context;
   
    return (
      <Article pad="none" primary={true} full="vertical">
          <Header pad='medium' justify='between'>
            
            <NavControl name={getMessage(intl,'Information iLO EDGE Overview')} />
            {/* <PowerIcon/> */}
          </Header>
          <Section pad='none'>
          <Tabs justify='Start'>
            <Tab title='Overview'>
              <Overview /> 
            </Tab>
            <Tab title='Session List'>
              <SessionList /> 
            </Tab>
            <Tab title='Logs'>
              <Logs />
            </Tab>
            <Tab title='Diagnostics'>
              <Diagnostics /> 
            </Tab>       
          </Tabs>
        </Section>
      </Article>
            
         );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  tasks: []
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);
