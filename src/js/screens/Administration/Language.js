import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App, Footer, FormFields } from 'grommet';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';

import Paragraph from 'grommet/components/Paragraph';
import TrashIcon from 'grommet/components/icons/base/Trash';

import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

import Button from 'grommet/components/Button';
//import FormFields from 'grommet/components/FormFields';


export default class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    const {currentValue} = this.state;

       return (
      
        <Box flex={true}>
          <Section pad="medium">
            <Title >Installed Languages</Title>
            <List selectable={true} onSelect=''>
              <ListItem justify='between'
                separator='horizontal'>
                  <Box direction="row" align="start" pad={{between: 'medium'}}>
                  <span>en</span><strong>English</strong></Box>
                  <TrashIcon/>
                
              </ListItem>
              <ListItem justify='between'
                separator='horizontal'>
                <Box direction="row" align="start" pad={{between: 'medium'}}>
                  <span>ja</span><strong>日本語</strong> </Box>
                  <TrashIcon/>
                
              </ListItem>
            </List>
          </Section>
          <Form>
          <Section pad="medium">
                  <Header>
                      <Title>
                      Default Language
                      </Title>
                  </Header>
                  <FormFields>
                  <FormField><Select placeHolder='None'
                          options={['en', 'ja']}
                          value={currentValue}
                          onChange={event => { this.setState({ currentValue: event.option })}}/>
                  </FormField>
                  </FormFields>
                  <Footer pad={{"vertical": "medium"}}>
                  <Button label='Apply'
                              align='center'
                              type='submit'
                              primary={true}
                              onClick='' />

                    </Footer>

          </Section>
          </Form>
        </Box>
    );
  }
};