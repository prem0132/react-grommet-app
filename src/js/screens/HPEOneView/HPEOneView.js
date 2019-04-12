//Oneview Not Required TO DO: Delete this file
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App } from 'grommet';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import Paragraph from 'grommet/components/Paragraph';

export default class HpeOneViewSummary extends Component {
    render() {

        return (

          <Box direction='column' align='start' border={{ color: 'light-3' }} basis='medium' pad='small'>
            
            <Title>Reset Password</Title>
              
            <Paragraph>
              <strong>Warning:</strong> This system is being managed by: HPE OneView.  
              Changes made locally in will be out of sync with the centralized settings.
            </Paragraph>
                
              
            <Footer>
              <Button  type="submit" label="Launch"
                 />
            </Footer>
          </Box>
        );
    }
};