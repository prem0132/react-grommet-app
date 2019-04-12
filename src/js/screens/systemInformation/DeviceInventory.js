import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import ActionsIcon from 'grommet/components/icons/base/Actions';


import { pageLoaded } from '../utils';
import { loadDevices,unloadDevices } from '../../actions/SystemInformation/DeviceInventory';
import store from '../../store';


const ColumnData=[
  {label: 'Device Name',value: 'Name'},
  {label: 'Device ID',value: 'DeviceId'},
  {label: 'Vendor ID',value: 'VendorId'}
 ]


 class DeviceInventory extends Component {
  constructor(props) {
    super(props);
    this._OnSort = this._OnSort.bind(this);
    const indexvalue = 0;
    const devicesort = false;
    this.state = {
      devicesort,
      indexvalue    
    };    
    }
	 
    componentDidMount() {
    pageLoaded('Device Inventory');
    //console.log("componentDidMount entered");
    this.props.dispatch(loadDevices());
   }

   componentWillUnmount() {
    const { dispatch } = this.props;
    //console.log("componentWillUnMount entered");
    dispatch(unloadDevices());
  }
  

   _Sort(indexvalue,devicesort) {
    const { value } = ColumnData[indexvalue];
    //console.log('row1',value)
    const {array} = this.props;
    //console.log('row2',PCIDevices)
    return array.slice(0).sort((r1,r2) => {
       //console.log('row3',r1[value])
      if (r1[value] < r2[value]){
          return ( devicesort ? 1 : -1);
      } else if (r2[value] < r1[value]){
          return (devicesort ? -1 : 1)
      } else {
        return 0;
      }
    })
   
  }
 

   _OnSort(indexvalue,devicesort) {
    //console.log('onsort:',indexvalue,devicesort);
    const data = this._Sort(indexvalue,devicesort);
      
    this.setState({
      data,indexvalue,devicesort
    });
   
  } 

  render() {

    const { PCIDevices, USBDevices } = this.props;

    //console.log('PCIDevices:',PCIDevices,'USBDevices',USBDevices)

    const columnlabels = ColumnData.map((cd) => cd.label);

/*     let key = (Object.keys(PCIDevices[0]));  
    let exp = Object.values(PCIDevices[0]);
    let exp2 = Object.entries(PCIDevices[0]) ;
    //console.log('key:',key,'exp------',exp,'----exp2',exp2); */

    
    const PCIDevicemain = PCIDevices.map((PCIDev) =>{
      //console.log('Object.values(PCIDev)[0]', Object.values(PCIDev)[0]);
      let PCIDevi = Object.values(PCIDev)[0];
      //console.log('PCIDevi:',PCIDevi);

    return( 
      <tbody>
      <TableRow><td>{PCIDevi.Name}</td><td>{PCIDevi.DeviceId}</td><td>{PCIDevi.VendorId}</td></TableRow>
      </tbody>
    )
        }
      );

      const USBDevicemain = USBDevices.map((USBDev) =>{
        //console.log('Object.values(USBDev)[0]', Object.values(USBDev)[0]);
        let USBDevi = Object.values(USBDev)[0];
        //console.log('PCIDevi:',USBDevi);
  
      return( 
        <TableRow><td>{USBDevi.Name}</td><td>{USBDevi.DeviceId}</td><td>{USBDevi.VendorId}</td></TableRow>
      )
          }
        ); 

       

      //console.log('PCIDevices at the end', PCIDevices)

      /* COMMENTED OUT MCTP DOSCOVERY
           <Box >
            <Box  align='start'><label>MCTP Discovery:</label></Box>
            <Box  align='end'><Button icon={<ActionsIcon />}label='Discovery' type='submit' primary={true} onClick='' /></Box>
            </Box>
      */ 

    return (

      <Box flex={true}>
		<Section pad="medium" >
			<Box align='start'>
              <Title>Device Inventory</Title>
            </Box>
           
                      
      
      
      <Box direction="row" align='start'>
        <Title>PCI Devices</Title>
        </Box>
        <Table>
        <TableHeader labels={columnlabels} />
            {PCIDevicemain}

        </Table>

        <Box direction="row" align='start'>
        <Title>USB Devices</Title>
        </Box>
        <Table>
        <TableHeader labels={columnlabels}/>
          <tbody>
          {USBDevicemain}
          </tbody>
        </Table>
        

        

    </Section>
    </Box>
      

   
    );
  }
};



DeviceInventory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  PCIDevicesList: PropTypes.arrayOf(PropTypes.object)
};



const select = state => ({ ...state.DeviceInventory });

export default connect(select)(DeviceInventory);