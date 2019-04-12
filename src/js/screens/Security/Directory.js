import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import Section from 'grommet/components/Section';
import FormFields from 'grommet/components/FormFields';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Anchor from 'grommet/components/Anchor';

const LOG_OPTIONS=['Disabled', 'Use Hpe Extended Schema','Use Directory Default Schema'];


export default class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }


    render() {
        const {currentValue} = this.state;

        return (
              <Box justify='start'
                    align='start'
                    wrap={true}
                    pad='large'
                    margin='small'
                    colorIndex='light-1'
                    >
                    <Form>
                        <Section>
                            <Header>
                                <Title>
                                Authentication Options
                                </Title>
                            </Header>
                            <FormFields>
                              <FormField>
                                <Box pad='small'><label>LDAP Directory Authentication</label></Box>
                                <Select placeHolder='None'
                                    options={LOG_OPTIONS}
                                    value={currentValue}
                                    onChange={event => { this.setState({ currentValue: event.option })}}/>
                              </FormField>
                              <FormField>
                                <CheckBox label='Local User Accounts'
                                  toggle={true}
                                  disabled={false}
                                  reverse={false} />
                                  </FormField>
                                  <FormField>
                                <CheckBox label='Kerberos Authentication'
                                  toggle={true}
                                  disabled={false}
                                  reverse={false} />
                              </FormField>

                            </FormFields>
                        </Section>

                        <Section>
                            <Header>
                                <Title>
                                Directory Server Settings
                                </Title>
                            </Header>
                            <FormFields>
                              
                                <FormField>
                                  <CheckBox label='Generic LDAP'
                                    toggle={true}
                                    disabled={false}
                                    reverse={false} />
                                </FormField>
                                <FormField>
                                  <Box pad='small'><label>ESC Object Distinguished Name</label></Box>
                                  <Box pad='small'><label>CAC LDAP Service Account</label></Box>
                                  <TextInput id='item1' name='item-1' value=''/>
                                </FormField>

                                <FormField>
                                  <Box pad='small'><label>ESC Object Password</label></Box>
                                  <TextInput id='item1' name='item-1' value=''/>
                                </FormField>

                                <FormField>
                                  <Box pad='small'><label>Directory Server Address</label></Box>
                                  <TextInput id='item1' name='item-1' value=''/>
                                </FormField>

                                <FormField>
                                  <Box pad='small'><label>Directory Server LDAP Port</label></Box>
                                  <TextInput id='item1' name='item-1' value=''/>
                                </FormField>

                                <FormField>
                                    <Box align='start' ><label>Certificate Status</label></Box>
                                    <Box align='end' ><Anchor align='end' label='import' href='#'/></Box>
                                    
                                    <TextInput id='item1' name='item-1' value=''/>
                                </FormField>
                            </FormFields>

                            <Footer pad={{"vertical": "small"}}>
                              <Box pad='small'><Button label='Administrator Groups' type='submit' /></Box>
                              <Box pad='none'><Button  label='Test Settings' type='submit' /></Box>
                              <Box pad='small'><Button primary={true} label='Apply Settings' type='submit' /></Box>
                            </Footer>


                                
                          
                        </Section>
                    </Form>
              </Box>     
        );
    }
};