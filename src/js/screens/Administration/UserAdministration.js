import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { PropTypes } from 'react';
import { connect } from "react-redux";


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
import { loadAdmin,unloadAdmin,loadAdminEdit,deleteAccount } from '../../actions/Administration/Useradmin';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import { pageLoaded } from '../utils';
import store from '../../store';

import { Login } from '../Login';

class UserAdministration extends Component {

  constructor(props) {
    super(props);
   // this._onChange=this._onChange.bind(this);
    this._onEdit=this._onEdit.bind(this);
    this._onDelete=this._onDelete.bind(this);
    //this._setId=this._setId.bind(this);
    this.state = {
      Name:undefined,
      componentId:undefined
   // ID:undefined,
      
      
     // Accountsdetail:undefined,
      //Accountsdetail: [{IsChecked: false}]
    //  Accountsdetail: props.Accountsdetail.map(account => ({ ...account, IsChecked: true })),
    //IsChecked: true,
    //data:undefined
    };

  }

  componentDidMount() {
    //console.log('state in componentWillMount',this.state)
    //console.log('store componentwillMount ',store.getState())
    pageLoaded('UserAdministration');
    this.props.dispatch(loadAdmin());
    
  }
  
 

  componentWillUnmount() {
    //console.log("componentWillUnMount entered");
      const { dispatch } = this.props;
      dispatch(unloadAdmin());
    }


    _onEdit(componentId){ 
      //console.log("_onEdit", componentId); 
    this.setState({ componentId: componentId })
    this.props.dispatch(loadAdminEdit(componentId)); 

    }

      
    _onDelete(componentId){
      //console.log("_onDelete", componentId); 
      this.setState({ componentId: componentId })
      this.props.dispatch(deleteAccount(componentId));
    }
    
 
  render() {
    const {componentId} = this.state;

   //console.log('after adding role',this.props.Accountsdetail)
 //console.log('store in componentDidMount',store.getState())
 //console.log('store in componentDidMount',this.state)
    
    
    let Accounts = this.props.Accountsdetail.map(account =>
      <TableRow><td>{account.Name}</td><td>{account.Role}</td><td><Button path={this.props.accountType== 'admin'? `/Admin/Edit/${account.Name}`:null} icon={<EditIcon />} onClick={this.props.accountType== 'admin'? this._onEdit.bind(this,account.Id):null}/><Button icon={<TrashIcon />} onClick={this.props.accountType== 'admin'? this._onDelete.bind(this,account.Id):null}/></td></TableRow>
    );

  


    return (
      
      <Box flex={true} >
        
          <Section pad="medium">
                        
                <Title >Local Users</Title>
                        
                <Table>
                    <thead>
                      <tr>
                        <th>
                        <strong>User Name</strong>
                        </th>
                        <th>
                        <strong>Account Type</strong>
                        </th>
                        <th>
                         
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Accounts}
                    </tbody>
                </Table>
                <Footer pad={{"vertical": "small"}}>
                  <Box pad='small'><Button label='New' type={this.props.accountType== 'admin'? 'button':null} path={this.props.accountType== 'admin'? '/Admin/Add':null} /></Box>
                </Footer>
          </Section>
                        

      </Box>
    );
  }
};



UserAdministration.defaultProps = { 
  Accountsdetail: [],
  router: PropTypes.object.isRequired,
};



UserAdministration.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Accountsdetail: PropTypes.arrayOf(PropTypes.object)
};





const select = state => ({ ...state.Useradmin,...state.session });

export default connect(select)(UserAdministration);