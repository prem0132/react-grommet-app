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

export default class DirectoryGroups extends Component {
  render() {

    const Diritems = [
      {Name: 'Administrator', SID: ''}
    ]
    const DirData = Diritems.map((dir) =>
      <TableRow>
        <td><CheckBox toggle={false} /></td>
        <td>{dir.Name}</td><td>{dir.SID}</td><td></td><td></td><td></td><td></td><td></td></TableRow>
    );

    return (
      
      <Box >
        
                        

          <Section pad="medium">

              <Title >Directory Groups</Title>

                  <Table>
                    <TableHeader labels={['', 'Group','SID','','','','','']}/>
                      <tbody>
                          {DirData}
                        
                      </tbody>
                  </Table>
                  <Footer pad={{"vertical": "small"}}>
                    <Box pad='small'><Button label='New' type='submit' /></Box>
                    <Box pad='none'><Button  label='Edit' type='submit' /></Box>
                    <Box pad='small'><Button  label='Delete' type='submit' /></Box>
                  </Footer>
          </Section>


      </Box>
    );
  }
};