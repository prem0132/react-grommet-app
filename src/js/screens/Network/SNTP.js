import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
//import Table from 'grommet/components/Table';
//import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
//import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
//import Anchor from 'grommet/components/Anchor';
//import Paragraph from 'grommet/components/Paragraph';
import Form from 'grommet/components/Form';
import Section from 'grommet/components/Section';
import FormFields from 'grommet/components/FormFields';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';



export default class SNTP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {currentValue} = this.state;

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
                        SNTP Settings
                        </Title>
                    </Header>
                    
                    <FormFields>
                      <FormField>
                        <CheckBox label='Use DHCPv4 Supplied Time Settings'
                        toggle={true}
                        disabled={false}
                        reverse={false} />
                      </FormField>
                      <FormField>
                      <CheckBox label='Use DHCPv6 Supplied Time Settings'
                        toggle={true}
                        disabled={false}
                        reverse={false} />
                      </FormField>
                      <FormField>
                      <CheckBox label='Propagate NTP Time to Host'
                        toggle={true}
                        disabled={false}
                        reverse={false} />
                      </FormField>
                      <FormField><TextInput id='item1' name='item-1' value='Primary Time Server'/></FormField>
                      <FormField><TextInput id='item1' name='item-1' value='Secondary Time Server'/></FormField>
                      <FormField><Select placeHolder='None'
                          options={['windows', 'custom', 'Disabled']}
                          value={currentValue}
                          onChange={event => { this.setState({ currentValue: event.option })}}/>
                      </FormField>
                    </FormFields>
                    
                    <Footer pad={{"vertical": "medium"}}>
                    
                    
                    <Box pad='small'><Button align='start' label='Reset' type='reset' /></Box>
                      
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