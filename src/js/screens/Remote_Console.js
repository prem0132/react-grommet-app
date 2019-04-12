import React, { Component } from 'react';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';


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


import Launch from './Remote_Console/Launch';
//import Virtual_Media from './RemoteConsole/Virtual_Media';
//import Hot_Keys from './RemoteConsole/Hot_Keys';
import Security from './Remote_Console/Security';

import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';

export default class RemoteConsole extends Component {
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
          <NavControl name={getMessage(intl,'Remote Console & Media')} />
        </Header>
          <Section pad='none'>
          <Tabs justify='Start'>
            <Tab title='Launch'>
              <Launch /> 
            </Tab>
            {/* <Tab title='Security'>
              <Security /> 
            </Tab> */}
          </Tabs>
          </Section>
          </Article>
        
      );
  }
}