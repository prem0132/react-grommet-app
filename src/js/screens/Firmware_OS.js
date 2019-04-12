import React, { Component } from 'react';
import { Grommet, App } from 'grommet';
import ReactDOM from 'react-dom';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Sidebar from 'grommet/components/Sidebar';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Layer from 'grommet/components/Layer';

import Firmware from './firmware&OS/Firmware';
import Repo from './firmware&OS/Repo';


import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';

import Updateform from '../screens/firmware&OS/Upload/Updateform'
import UploadESC from '../screens/firmware&OS/Upload/UploadESC'


const LAYERS = {
    update: Updateform,
    uploadesc: UploadESC
};

export default class Firmware_OS extends Component {
 constructor(props){
   super(props);
   this._onLayerOpen = this._onLayerOpen.bind(this);
   this._LayerDeactivate = this._LayerDeactivate.bind(this);
   this.state={
     layer:null,
     errors: {}
   };
 }


  _LayerDeactivate () {
    this.setState({ layerActive: false });
  }

  _onLayerOpen (name) {
    this.setState({ layerActive: true , layer: name});
  }

  _renderLayer () {
    let layer; 
    if (this.state.layerActive && this.state.layer) {
      const Layer = LAYERS[this.state.layer];
      layer = <Layer onClose={this._LayerDeactivate}/>;
    }
    return layer;
  }



  render() {
    const { intl } = this.context;
    const { layerActive } = this.state;
    let layer=this._renderLayer();
   
      return (

        <Split flex='left' separator={true}>
          <Article pad="none" primary={true} full="vertical">
            <Header
            direction='row'
            justify='between'
            size='large'
            pad={{ horizontal: 'medium', between: 'small' }}
              >
              <NavControl name={getMessage(intl,'Firmware')} />
            </Header>
            <Section pad='none'>
              <Tabs justify='start'>
                <Tab title='Firmware'>
                  <Firmware /> 
                </Tab>
                <Tab title='Repository'>
                <Repo /> 
                </Tab>      
              </Tabs>

            </Section>
          </Article>

          <Sidebar colorIndex='grey-4-a' justify='center' align='center' pad='none' size='medium'>
           <span />
            <Menu responsive={true} align='center' justify='center'>
              <Anchor href='#' onClick={this._onLayerOpen.bind(this, 'update')}>
                <Heading tag='h3'>Update Firmware</Heading>
              </Anchor>
              <Anchor href='#' onClick={this._onLayerOpen.bind(this, 'uploadesc')}>
                <Heading tag='h3'>Upload to Repository</Heading>
              </Anchor>
            </Menu>
              {layer}
          </Sidebar>

        </Split>
         
    );
  }
}