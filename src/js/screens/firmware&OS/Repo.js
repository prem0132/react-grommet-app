import React, { Component , PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { connect } from "react-redux";

import { Grommet, App, Header, Section, Notification } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import TrashIcon from 'grommet/components/icons/base/Trash';

import { loadRepo,unloadRepo,deleteRepoComponent,deleteAllRepoComponent } from '../../actions/Firmware/Repo';
import { loadfirmware } from '../../actions/Firmware/firmware_OS';
import { pageLoaded } from '../utils';
import store from '../../store';



class Repo extends Component {

  constructor (props) {
    super(props);
    this._onDelete=this._onDelete.bind(this);
    this._onDeleteAll=this._onDeleteAll.bind(this);
    //this._ConvertBytes = this._ConvertBytes.bind(this);
    this.state = {
      IsRemoved: false,
      RepoInformation: {},
      ComponentsInfoAr: [],
      // firmwareInfoAr: [],
      componentId: undefined
      
    };
  }


  componentDidMount() {
    //console.log('componentDidMount entered')
     pageLoaded('Repo');
     this.props.dispatch(loadRepo());
    //console.log('before loadfirm')
    // this.props.dispatch(loadfirmware());
  }

  componentWillUnmount() {
      
      this.props.dispatch(unloadRepo());
    }

  _ConvertBytes(bytes) {
    
      if (bytes!==undefined){
       var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
       if (bytes == 0) return 'NA';
       var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
       //console.log('math i',i)
       if (i == 0) return bytes + ' ' + sizes[i];
    //console.log('math i2',(bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i])
       return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
      }
  } 


  _onDelete (componentId) {
    //console.log('in screens ',componentId)
    this.setState({IsRemoved: true, componentId: componentId })
    //console.log('before delete dispatch ',componentId)
    this.props.dispatch(deleteRepoComponent(componentId));
  }

  _onDeleteAll(){
   //console.log("On Delete All")
    const { ComponentsInfoAr } = this.props;
   //console.log("components array:",ComponentsInfoAr)
    let delcomparray = []
    for(let i=0; i<ComponentsInfoAr.length;i++){
     //console.log("name:",ComponentsInfoAr[i].Name)
      delcomparray.push(`/redfish/v1/UpdateService/SoftwareInventory/${ComponentsInfoAr[i].Name}`)
      this.props.dispatch(deleteAllRepoComponent(delcomparray));
    }
   //console.log("to be deleted:",delcomparray)
  }
  

  _rendercontField () {
    const { ComponentsInfoAr } = this.props;
    let result;
    result = ComponentsInfoAr.map((cont) =>{
      return (
        <TableRow>
          <td>{cont.Name}</td>
          <td></td>
          <td><Button icon={<TrashIcon />} onClick={this.props.accountType== 'admin'? this._onDelete.bind(this,cont.Name):null}/></td>
        </TableRow>
    
      );
    })
    return result;
  }

  _renderrepoField () {
    const { RepoInformation } = this.props;
    let result;
    result = (
        <tbody>
            <TableRow><td><strong>Capacity:</strong></td><td>{this._ConvertBytes(RepoInformation.TotalSpace)}</td></TableRow>
            <TableRow><td><strong>In Use:</strong></td><td>{this._ConvertBytes(RepoInformation.UsedSpace)}</td></TableRow>
            <TableRow><td><strong>Free Space:</strong></td><td>{this._ConvertBytes(RepoInformation.FreeSpace)}</td></TableRow>
            <TableRow><td><strong>Components:</strong></td><td>{RepoInformation.Components}</td></TableRow>
        </tbody>
    );
   
    return result;
  }
  
   
  render() {
    const { IsRemoved ,componentId} = this.state
    const { ComponentsInfoAr } = this.props;
    // const firmdata = this._renderfirmField();
    const repodata = this._renderrepoField();
    const contdata = this._rendercontField();
    //console.log('before Notification',componentId,IsRemoved)
     let notification;
    if (this.state.IsRemoved){
      notification=(
       < Notification key="remove" pad="medium" status='critical'
       message={'File has been removed'}>
       <Paragraph>{componentId}</Paragraph>
       </ Notification>
      )

    }


    let RemoveAllbutton;
    RemoveAllbutton = <Button label='Remove All' type={this.props.accountType== 'admin'? 'submit':null} onClick={this.props.accountType== 'admin'? this._onDeleteAll:null} />
    if(ComponentsInfoAr.length == 0){
      RemoveAllbutton = <Button label='Remove All' />
    }
    
  

    return (
          <Box flex={true}>
               {notification}         
              <Section pad="medium">
              
                <Title>Repository</Title>
                <Table responsive={false}>
                {repodata}
                </Table>
              </Section>

              <Section pad="medium">
                <Title>Contents</Title>
                <Table responsive={true} selectable={true}
                  onSelect=''>
                  <thead>
                    <tr>
                      <th>
                      Name
                      </th>
                      <th>
                      Version
                      </th>
                      <th>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                     {/* {firmdata} */}
                     {contdata}
                  </tbody>
                </Table>
                <Footer pad={{"vertical": "small"}}>
                  <Box pad='small'>{RemoveAllbutton}</Box>
                </Footer>
              </Section>              
          
          </Box>         
    );
  }
};




Repo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  RepoInformation: PropTypes.object,
  ComponentsInfoAr: PropTypes.arrayOf(PropTypes.object)
  // firmwareInfoAr: PropTypes.arrayOf(PropTypes.object)
};



const select = state => ({ 
  ...state.repo,
  ...state.session
  
 /*  RepoInformation:state.repo.RepoInformation,
  ComponentsInfoAr:state.repo.ComponentsInfoAr,
  firmwareInfoAr:state.firmware_OS.firmwareInfoAr */
});

export default connect(select)(Repo);
