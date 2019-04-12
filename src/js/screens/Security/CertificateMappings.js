import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grommet, App, Header, Paragraph, Footer } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
//import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import CheckBox from 'grommet/components/CheckBox';
import TableHeader from 'grommet/components/TableHeader';
import Button from 'grommet/components/Button';



export default class CertificateMappings extends Component {
  render() {

    const cmitems = [
      {Name: 'Administrator'}
    ]
    const cmData = cmitems.map((cm) =>
      <TableRow>
        <td><CheckBox toggle={false} /></td>
        <td>{cm.Name}</td><td></td></TableRow>
    );

    return (
      <Box >
        
        <Section pad="medium">
                
            <Title >Certificate Mappings</Title>
                
            <Table>
                <thead>
                    <tr>
                      <th>
                      
                      </th>
                      <th>
                          <strong>Login Name</strong>
                      </th>
                      <th>
                          <strong>Certificate Thumbprint</strong>
                      </th>
                    </tr>
                </thead>
                <tbody>
                {cmData}
                </tbody>
            </Table>
            <Footer pad={{"vertical": "small"}}>
                <Box pad='small'><Button label='Authorize New Certificate' type='submit' /></Box>
                <Box pad='none'><Button  label='Delete Selected Certificate(s)' type='submit' /></Box>
          
            </Footer>
        </Section>
                
      </Box>
    );
  }
};

