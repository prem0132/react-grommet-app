import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, Paragraph, Anchor } from 'grommet';

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
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
//import Anchor from 'grommet/components/Anchor';


export default class Registration extends Component {
  render() {

    return (
        <Box >
                        

        <Section pad="medium">
            <Title >Get Connected to Hewlett Packard Enterprise</Title>
               <Paragraph> TBD </Paragraph>
        </Section>


        <Section pad="medium">
            <Title >Select one of two ways to register:</Title>
               <Paragraph> TBD </Paragraph>
        </Section>

        <Form>

            <Section pad="medium">
                <Title>Register this server directly to HPE</Title>
                <Table>
                    <tbody>
                        <TableRow><td><Heading tag='h4'>Enter HPE Passport Credentials</Heading></td><td><Anchor label="Don't have an account"/></td></TableRow>
                        <TableRow><td>HPE Passport Password</td><td><TextInput></TextInput></td></TableRow>
                        <TableRow><td>Web Proxy Server</td><td><TextInput></TextInput></td></TableRow>
                        <TableRow><td>Web Proxy Port</td><td><TextInput></TextInput></td></TableRow>
                        <TableRow><td>Web Proxy Username</td><td><TextInput></TextInput></td></TableRow>
                        <TableRow><td>Web Proxy Password </td><td><TextInput></TextInput></td></TableRow>
                    </tbody>
                </Table>
                <CheckBox label='I accept the' /><Anchor label="Terms and Conditions"/>
                <Button label='Register' href='#' type='submit' />
            </Section>
        </Form>

        
</Box>
        );
  }
};


