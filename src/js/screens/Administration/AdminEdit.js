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
import CheckBox from 'grommet/components/CheckBox';

//import TrashIcon from 'grommet/components/icons/base/Trash';

import { EditUserAccount } from '../../actions/Administration/Useradmin';
import { Section } from 'grommet';
import store from '../../store';




class AdminEdit extends Component {

  constructor (props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);
    this._selected = this._selected.bind(this);


    this.state = {
      UserName:undefined,
      Password: undefined,
      id: undefined,
      IsEnabled:false,
      confirmpassword: undefined,
      Role:undefined,
      errors: {},
      
    };
  }

  componentWillReceiveProps (nextProps) {
    //console.log(nextProps.account.RoleId)
    
    this.setState({ Role: nextProps.account.RoleId });
  
}

  /* componentWillMount() {
    //console.log(this.state)
    this.state.Password = store.getState().Useradmin.account.Password;
    this.state.Role = this.props.account.RoleId
    //console.log("incomponent",this.state.Password)
  }
 */
 

   _onSubmit(){
       
       if (this.state.IsEnabled == true)
       {
        if (this.state.confirmpassword == this.state.Password){
        let EditUserData={
            "Password":this.state.Password,
            "RoleId": this.state.Role
          }
          //console.log("in submit",EditUserData)
          this.props.dispatch(EditUserAccount(EditUserData,this.props.account.Id))
          window.location.href = '/Administration';
        }else{
          alert("Password doesn't match")
        }
      } else if(this.state.IsEnabled == false){

        let EditUserData={
          "RoleId": this.state.Role
        }
        //console.log("in submit",EditUserData)
        this.props.dispatch(EditUserAccount(EditUserData,this.props.account.Id))
        window.location.href = '/Administration';


      }
      
    }
  

   _onChange (event) {
  
    this.setState({ [event.target.name]: event.target.value});
  } 

  _onChangeCheckBox () {
  
    this.setState({ IsEnabled: !this.state.IsEnabled});
  }

  _selected(option){
    //console.log('_selected(option)',option.option,option.target.name,option.target.id)
    this.setState({ [option.target.id] : option.option })
}



  render () {
    const {IsEnabled,Role} = this.state;
    const {account,UserName} = this.props;
    //console.log(account)
    //console.log('username',account.UserName)
    

    let PasswordData;
    if(this.state.IsEnabled === true){
     PasswordData=(
       <div>
        <Section>
        <FormFields>
        <fieldset>
        <FormField htmlFor="password" label="Password"
       >
        <input id="Password" name="Password" type="password"
          value={this.state.Password}
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
      </Section>
</div>

      )
    }
    
    

    return (
      <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
   


      
        <Form onSubmit={this._onSubmit} >

          <Header size="large" justify="between" pad="none">
            <Heading tag="h2" margin="none" strong={true}>
            Edit Local User
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
                  value={this.props.account.UserName} />
              </FormField>
              <FormField htmlFor="Role" label="Role" >
                  <Select  id="Role" name="Role"
                  value={this.state.Role} options={["user","admin"]} 
                  onChange={this._selected} />
              </FormField>             
            </fieldset>
          </FormFields>
          
          <FormFields>
          <FormField>
          
                                    <CheckBox label='Change Password'
                                        toggle={false}
                                        disabled={false}
                                        reverse={false}
                                        checked={this.state.IsEnabled}
                                        onChange={this._onChangeCheckBox} />
                                </FormField>



          </FormFields>
          {PasswordData}
         

         

          <Footer pad={{vertical: 'medium'}} justify="between">
            <Button type="button" primary={true} label='Edit User'
              onClick={this._onSubmit} />
         
          </Footer>
        </Form>

        
      </Article>
    );
  }
}

const select = state => ({ 
  account:state.Useradmin.account 
});

export default connect(select)(AdminEdit);