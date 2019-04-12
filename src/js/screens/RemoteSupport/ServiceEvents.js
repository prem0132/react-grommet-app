import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grommet, App } from 'grommet';

import Box from 'grommet/components/Box';

import Title from 'grommet/components/Title';

import Paragraph from 'grommet/components/Paragraph';



export default class ServiceEvents extends Component {
  render() {

    return (
      <Paragraph>
                  
          <Box direction='column' align='start' border={{ color: 'light-3' }} basis='medium' pad='small'>
              <Title>
                Service Events (TBD)
              </Title>
          </Box>
      </Paragraph>
    );
  }
};