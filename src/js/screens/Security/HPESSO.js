import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App, Footer } from 'grommet';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
//import Footer from 'grommet/components/Footer';

import Select from 'grommet/components/Select';

import Paragraph from 'grommet/components/Paragraph';
import UploadIcon from 'grommet/components/icons/base/Upload';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import LoginIcon from 'grommet/components/icons/base/Login';
import DesktopIcon from 'grommet/components/icons/base/Desktop';
import PowerIcon from 'grommet/components/icons/base/Power';
import DocumentStoreIcon from 'grommet/components/icons/base/DocumentStore';


import HostMaintenanceIcon from 'grommet/components/icons/base/HostMaintenance';
import ConfigureIcon from 'grommet/components/icons/base/Configure';
import UserAdminIcon from 'grommet/components/icons/base/UserAdmin';
import ClusterIcon from 'grommet/components/icons/base/Cluster';
import DriveCageIcon from 'grommet/components/icons/base/DriveCage';
import VmMaintenanceIcon from 'grommet/components/icons/base/VmMaintenance';





const LOG_OPTIONS=['Trust None(SSO disabled)', 'Trust All', 'Trust by Name','Trust by Certificate'];
export default class HPESSO extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    render() {
        const {currentValue} = this.state;

      

        
        

     
        return (

            <Box direction='row'>
                    <Box justify='center'
                            align='start'
                            wrap={true}
                            pad='small'
                            >
                        
                        <Form>
                            <Section>
                                <Header>
                                    <Title>
                                    Single Sign-On Settings
                                    </Title>
                                    
                                </Header>
                                <FormField>
                                        <Box pad='small'><label>SSO Trust Mode</label></Box>
                                        <Select placeHolder='None'
                                            options={LOG_OPTIONS}
                                            value={currentValue}
                                            onChange={event => { this.setState({ currentValue: event.option })}}/>
                                </FormField>
                            </Section>

                            <Section full='horizontal'>
                                <Table>
                                    <thead>
                                        <tr>
                                        <th class='rotate'>
                                        <strong>User</strong>
                                        </th>
                                        <th class='rotate'>
                                            <strong>Operator</strong>
                                        </th>
                                        <th class='rotate'>
                                            <strong>Administrator</strong>
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {}
                                    </tbody>
                                </Table>
                                <Footer pad={{"vertical": "small"}}>
                                    <Box pad='small'><Button primary={true} label='Apply' type='submit' /></Box>
                    
                                </Footer>
            
                                
                            </Section>
                        </Form>
                    </Box>

                    <Box justify='between'
                        align='end'
                        wrap={true}
                        pad='small'
                        >
                        
                        <Form>
                            <Section>
                                <Header>
                                    <Title>
                                    Manage Trusted Certificates and Records
                                    </Title>
                                    
                                </Header>
                                
                                <Footer>
                                    <Box pad='small' align='end'><Button icon={<UploadIcon />} primary={true} label='Import' type='submit' /></Box>
                                </Footer>

                            </Section>
                        </Form>
                    </Box>
            </Box>
        );
    }
};