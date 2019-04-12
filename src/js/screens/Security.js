import React, { Component } from 'react';
import { Grommet, App } from 'grommet';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';


import AccessSettings from './Security/AccessSettings';
import CertificateMappings from './Security/CertificateMappings';
import Directory from './Security/Directory';
import GMCAccessPort from './Security/GMCAccessPort';
import HPESSO from './Security/HPESSO';
import LoginSecurityBanner from './Security/LoginSecurityBanner';
import SecureShellKey from './Security/SecureShellKey';
import SSLCertificate from './Security/SSLCertificate';

import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';





export default class Security extends Component {

    

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
            <NavControl name={getMessage(intl,'Security')} />
          </Header>
          <Section pad='none'>
            <Tabs justify='start'>
              <Tab title='Access Settings'>
                <AccessSettings /> 
              </Tab>
              {/* <Tab title='ESC Access Port'>
                <GMCAccessPort /> 
              </Tab> */}
              <Tab title='Secure Shell Key'>
                <SecureShellKey /> 
              </Tab>
              {/* <Tab title='Certificate Mappings'>
                <CertificateMappings /> 
              </Tab> */}
              <Tab title='SSL Certificate'>
                <SSLCertificate /> 
              </Tab>
              {/* <Tab title='Directory'>
                <Directory /> 
              </Tab>
              <Tab title='HPESSO'>
                <HPESSO /> 
              </Tab> */}
              <Tab title='Login Security Banner'>
                <LoginSecurityBanner /> 
              </Tab>
            </Tabs>
          </Section>
        </Article>
           
      );
  }
}