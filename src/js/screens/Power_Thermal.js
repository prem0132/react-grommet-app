import React, { Component } from 'react';
import Grid from 'grommet/components/chart';
import { Grommet, App } from 'grommet';
import ReactDOM from 'react-dom';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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



import SystemPower from './Power&Thermal/Systempower';
//import Summary from './Power&Thermal/Summary';
import Temperature from './Power&Thermal/Temperature';

import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';


export default class Power_Thermal extends Component {
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
          <NavControl name={getMessage(intl,'Power & Thermal')} />
        </Header>
          <Section pad='none'>
          <Tabs justify='start'>
            {/* <Tab title='Summary'>
              <Summary />
            </Tab> */}
            <Tab title='System Power'>
              <SystemPower /> 
            </Tab>
            <Tab title='Temperature'>
              <Temperature />
            </Tab>
           
          </Tabs>
          </Section>
          </Article>
       
        
      );
  }
}