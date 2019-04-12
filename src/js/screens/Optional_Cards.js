import React, { Component } from 'react'
import { Grommet, App } from 'grommet';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import Daughter_cards from '../screens/Optional_cards/Daughter_cards';


import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';

export default class Optional_Cards extends Component {

    

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
            <NavControl name={getMessage(intl,'Option Cards')} />
          </Header>
          <Section pad='none'>
            <Tabs justify='start'>
              <Tab title='Daughter Cards '>
              <Daughter_cards />   
              </Tab>  
            </Tabs>
          </Section>
        </Article>
           
      );
  }
}