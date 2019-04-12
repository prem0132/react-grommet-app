import React, { Component } from 'react';
import { Grommet, App } from 'grommet';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import Backup_and_Restore from './Administration/Backup_and_Restore';
import Boot_Order from './Administration/Boot_Order';
//import DirectoryGroups from './Administration/DirectoryGroups';
//import Language from './Administration/Language';
import UserAdministration from './Administration/UserAdministration';
import Secure_Erase from './Administration/Secure_Erase';
import Kill from './Administration/Kill';

import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';


export default class Administration extends Component {

    

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
            
            <NavControl name={getMessage(intl, 'Administration')} />
          </Header>
          
          <Section pad='none'>
            <Tabs justify='start'>
              <Tab title='User Administration'>
                <UserAdministration /> 
              </Tab>
              { /*<Tab title='Directory Groups'>
                <DirectoryGroups /> 
              </Tab> */}
              <Tab title='Boot Order'>
                <Boot_Order /> 
              </Tab>
              {/*<Tab title='Language'>
                <Language /> 
              </Tab>*/}
              <Tab title='Backup and Restore'>
                <Backup_and_Restore /> 
              </Tab>
              <Tab title='Secure Erase'>
                <Secure_Erase /> 
              </Tab>
              <Tab title='Kill'>
                <Kill /> 
              </Tab>
            </Tabs>
          </Section>
        </Article>
           
      );
  }
}