import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

//import { hpe } from 'grommet/themes';

import Box from 'grommet/components/Box';
//import Field from 'grommet/components/Field';

import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';

import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';


class Launch extends Component {

render() {
    return (
        <Box direction='column' align='start' border={{ color: 'light-3' }} basis='medium' pad='small'>
            
                <Title>
                    Integrated Remote Console
                </Title>
                {/* <Paragraph>
            <span>The .NET IRC provides remote access to the system KVM and control of Virtual Power and Media from a single console built on the Microsoft .NET Framework. </span>
            </Paragraph> */}
            <Footer>
                
              <Button type={this.props.accountType== 'admin'? 'submit':null} label="Launch" onClick = {this.props.accountType== 'admin'? () => window.open(window.location.origin + "/remote.htm", '_blank'):null}/>
            </Footer>
          </Box>
    
    );
    }
};

const select = state => ({ ...state.session });

export default connect(select)(Launch);
