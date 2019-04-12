import React, { Component } from 'react';
import { Grommet, App } from 'grommet';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Summary from './Network/Summary';
import General from './Network/General';
import IPV4 from './Network/IPV4';
import IPV6 from './Network/IPV6';
import WiFi from './Network/WiFi';
import LTE from './Network/LTE';
import WiFiAp from './Network/WiFiAp';

import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';





export default class Network extends Component {

    

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
           <NavControl name={getMessage(intl,'Wired and Wireless Network')} />
         </Header>
          <Section pad='none'>
            <Tabs justify='start'>
              <Tab title='Summary'>
                <Summary /> 
              </Tab>
              <Tab title='General'>
                <General /> 
              </Tab>
              <Tab title='IPV4'>
                <IPV4 /> 
              </Tab>
              <Tab title='IPV6'>
                <IPV6 /> 
              </Tab>
              <Tab title='WiFi'>
                <WiFi /> 
              </Tab>
              <Tab title='WiFi AP'>
                <WiFiAp /> 
              </Tab>
              <Tab title='LTE'>
                <LTE /> 
              </Tab>
            </Tabs>
          </Section>
        </Article>
           
      );
  }
}