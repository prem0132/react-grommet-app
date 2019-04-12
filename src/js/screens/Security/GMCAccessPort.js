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


export default class GMCAccessPort extends Component {
    render() {

        return (
          <Box justify='center'
        align='center'
        wrap={true}
        pad='large'
        margin='small'
        colorIndex='light-1'
        >
        <Form>
            <Section>
                <Header>
                    <Title>
                    Access Options
                    </Title>
                </Header>
                
                <FormFields>
                    <FormField>
                    <CheckBox label='Service Port'
                    toggle={true}
                    disabled={false}
                    reverse={false} />
                    </FormField>
                    
                </FormFields>
                
            </Section>
            <Section>
                <Header>
                    <Title>
                    Mass Storage Options
                    </Title>
                </Header>
                
                <FormFields>
                    <FormField>
                    <CheckBox label='USB flash drives'
                    toggle={true}
                    disabled={false}
                    reverse={false} />
                    </FormField>
                    <FormField>
                    <CheckBox label='Require authentication'
                    toggle={true}
                    disabled={false}
                    reverse={false} />
                    </FormField>
                    
                </FormFields>
                
            </Section>
            <Section>
                <Header>
                    <Title>
                    Networking Options
                    </Title>
                </Header>
                
                <FormFields>
                    <FormField>
                      <CheckBox label='USB flash drives'
                      toggle={true}
                      disabled={false}
                      reverse={false} />
                    </FormField>
                    <FormField>
                      <CheckBox label='Require authentication'
                      toggle={true}
                      disabled={false}
                      reverse={false} />
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