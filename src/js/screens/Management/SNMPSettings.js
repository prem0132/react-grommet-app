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
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import RadioButton from 'grommet/components/RadioButton';


export default class SNMPSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    
    render() {

        const SNMPitems = [
            {IP: '', COMM: '',PRO: '',user: ''}
            ]
        const SNMPData = SNMPitems.map((SNMP) =>
            <TableRow>
              <td><CheckBox toggle={false} /></td>
              <td>{SNMP.IP}</td><td>{SNMP.COMM}</td><td>{SNMP.PRO}</td><td>{SNMP.user}</td>
            </TableRow>
        );

        const {currentValue} = this.state;

        return (
                <Box justify='center'
                    align='center'
                    wrap={true}
                    pad='small'
                    margin='small'
                    colorIndex='light-1'
                    >
                    <Form plain={true}>
                        <Section full='horizontal'>
                            <Header>
                                <Title>
                                SNMP Alert Destinations
                                </Title>
                            </Header>
                            <Table>
                                <thead>
                                    <tr>
                                    <th>
                                    
                                    </th>
                                    <th>
                                        <strong>SNMP Alert Destination</strong>
                                    </th>
                                    <th>
                                        <strong>Trap Community</strong>
                                    </th>
                                    <th>
                                        <strong>SNMP Protocol</strong>
                                    </th>
                                    <th>
                                        <strong>SNMPv3 User</strong>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SNMPData}
                                </tbody>
                            </Table>
                            <Footer pad={{"vertical": "small"}}>
                              <Box pad='small'><Button primary={true} label='New' type='submit' /></Box>
                              <Box pad='none'><Button  label='Edit' type='submit' /></Box>
                              <Box pad='small'><Button  label='Delete' type='submit' /></Box>
                            </Footer>

                        </Section>

                        <Section>
                            <Header>
                                <Title>
                                SNMP Alerts
                                </Title>
                            </Header>
                            <FormFields>
                              
                                <FormField>
                                    <Box pad='small'><label>Trap Source Identifier</label></Box>
                                    <RadioButton id='choice1-1'
                                        name='choice1-1'
                                        label='ESC Hostname'
                                        checked={true}
                                        onChange='' />
                                    <RadioButton id='choice1-2'
                                        name='choice1-2'
                                        label='OS Hostname'
                                        checked={false}
                                        onChange='' />
                                </FormField>
                                <FormField>
                                    <CheckBox label='ESC SNMP Alerts'
                                    toggle={true}
                                    disabled={false}
                                    reverse={false} />
                                </FormField>
                                <FormField>
                                    <CheckBox label='Cold Start Trap Broadcast'
                                    toggle={true}
                                    disabled={false}
                                    reverse={false} />
                                </FormField>

                                <FormField>
                                  <Box pad='small'><label>Periodic HSA Trap Configuration</label></Box>
                                  <Select placeHolder='None'
                                    options={['Disabled', 'Daily','Weekly','Monthly']}
                                    value={currentValue}
                                    onChange={event => { this.setState({ currentValue: event.option })}}/>
                                </FormField>

                                
                            </FormFields>

                            <Footer pad={{"vertical": "small"}}>
                              <Box pad='small'><Button label='Send Test Alert' type='submit' /></Box>
                              
                              <Box pad='small'><Button primary={true} label='Apply' type='submit' /></Box>
                            </Footer>


                                
                          
                        </Section>
                    </Form>
                </Box>     
        );
    }
};