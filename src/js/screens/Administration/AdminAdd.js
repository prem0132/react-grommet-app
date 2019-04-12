import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import CloseIcon from 'grommet/components/icons/base/Close';
//import TrashIcon from 'grommet/components/icons/base/Trash';

import { AddUserAccount } from '../../actions/Administration/Useradmin';




class AdminAdd extends Component {

  constructor (props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._selected = this._selected.bind(this);

    this.state = {
      UserName:undefined,
      Password: undefined,
      confirmpassword: undefined,
      Role:'user',
      errors: {},
      
    };
  }

   _onSubmit(){
       //console.log(this.state)
       if (this.state.confirmpassword == this.state.Password){
       let AddUserData={
           "UserName":this.state.UserName,
           "Password":this.state.Password,
           "RoleId": this.state.Role
        }
        //console.log(AddUserData)
        this.props.dispatch(AddUserAccount(AddUserData))
        window.location.href = '/Administration';
      }else{
        alert("Password doesn't match")
      }
    }
  

  _onChange (event) {
  
    this.setState({ [event.target.name]: event.target.value});
  }

  _selected(option){
    //console.log('_selected(option)',option.option,option.target.name,option.target.id)
    this.setState({ [option.target.id] : option.option })
}


  render () {
    
    

    return (
      <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
   


      
        <Form onSubmit={this._onSubmit} >

          <Header size="large" justify="between" pad="none">
            <Heading tag="h2" margin="none" strong={true}>
            Add Local User
            </Heading>
            <Anchor path='/Administration' icon={<CloseIcon />} />
            
          </Header>

          <FormFields>
              <Heading tag="h3" margin="none" strong={true}>
              User Information
              </Heading>
              <fieldset>
                <FormField htmlFor="name" label="User Name" >
                  <input ref="UserName" id="UserName" name="UserName" type="text"
                    value={this.state.UserName} onChange={this._onChange} />
                </FormField>
                <FormField htmlFor="Role" label="Role" >
                  <Select  id="Role" name="Role"
                  value={this.state.Role} options={["user","admin"]} 
                  onChange={this._selected} />
                </FormField>
              </fieldset>
          </FormFields>

          <FormFields>
            <fieldset>
            <FormField htmlFor="password" label="Password"
           >
            <input id="Password" name="Password" type="password"
              value={this.state.password}
              onChange={this._onChange} />
          </FormField>
          <FormField htmlFor="password" label="Confirm Password"
           >
            <input id="confirmpassword" name="confirmpassword" type="password"
              value={this.state.confirmpassword}
              onChange={this._onChange} />
          </FormField>
             
              
            </fieldset>
          </FormFields>

         

          <Footer pad={{vertical: 'medium'}} justify="between">
            <Button type="button" primary={true} label='Add User'
              onClick={this._onSubmit} />
         
          </Footer>
        </Form>

        
      </Article>
    );
  }
}

//const select = state => ({ ...state.Useradmin });

export default connect()(AdminAdd);