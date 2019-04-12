import React, { Component } from 'react';
import Grid from 'grommet/components/chart';
import { Grommet, App } from 'grommet';
import ReactDOM from 'react-dom';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import { hpe } from 'grommet/themes';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Logo from 'grommet/components/icons/Grommet';


//import {hpe} from 'grommet/theme';

//import TodoAppDashboard from './components/TodoAppDashboard';
import SysSummary from './systemInformation/Summary';
import Memory from './systemInformation/Memory';
import Processor from './systemInformation/Processor';
import Network from './systemInformation/Network';
import DeviceInventory from './systemInformation/DeviceInventory';
//No storage tab
//import Storage from './systemInformation/Storage';

import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';






export default class Sysinfo extends Component {
  render() {
    const { intl } = this.context;

      return (
        <Article pad="none" primary={true} full="vertical">
          <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
            >
            <NavControl name={getMessage(intl,'System Information')} />
          </Header>
          <Section pad='none'>
          <Tabs justify='start'>
            <Tab title='Summary'>
              <SysSummary /> 
            </Tab>
            <Tab title='Processor'>
              <Processor /> 
            </Tab>
            <Tab title='Memory'>
              <Memory />
            </Tab>
            <Tab title='Network'>
              <Network /> 
            </Tab>
            <Tab title='Device Inventory'>
              <DeviceInventory />
            </Tab>
{/* No Storage tab
            <Tab title='Storage'>
              <Storage />
            </Tab> */}
       
          </Tabs>
        </Section>
        </Article>
      );
  }
}
