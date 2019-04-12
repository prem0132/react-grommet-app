import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App, Section } from 'grommet';

import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import Select from 'grommet/components/Select';



export default class Security extends Component {
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
                        Remote Console Computer Lock Settings
                    </Title>
                </Header>
                <span>Remote Console Computer Lock enhances the security of the server.</span>
                <FormFields>
                    <Select placeHolder='None'
                    options={['windows', 'custom', 'Disabled']}
                    value={undefined}
                    onChange=''/>
                </FormFields>
                <Footer pad={{"vertical": "medium"}}>
                    <Button label='Submit'
                        align='center'
                        type='submit'
                        primary={true}
                        onClick='' />
                </Footer>
            </Section>
            <Section>
                <Header>
                    <Title>
                        Key Sequence
                    </Title>
                </Header>
                <FormFields>
                    <Select placeHolder='PGUP'
                        options={['windows', 'PGUP', 'Disabled']}
                        value={undefined}
                        onChange=''/>
                    <Select placeHolder='None'
                        options={['windows', 'custom', 'Disabled']}
                        value={undefined}
                        onChange=''/>
                    <Select placeHolder='HOME'
                        options={['windows', 'HOME', 'Disabled']}
                        value={undefined}
                        onChange=''/>
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


//To do : Delete this file. Only enable/disable console moved to access settings.