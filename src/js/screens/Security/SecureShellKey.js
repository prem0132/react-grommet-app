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
import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import { loadSSHData,unloadSSH,AddnewKey,DeleteSSHKey } from '../../actions/Security/SSH';


import { pageLoaded } from '../utils';
import store from '../../store';


 class SecureShellKey extends Component {
    constructor () {
        super();
        //pageLoaded('this.state');
        this._onToggle = this._onToggle.bind(this);
        this._onChangeSSHKey = this._onChangeSSHKey.bind(this);
        this._onClickNewKey = this._onClickNewKey.bind(this);
        this._onClickDelete = this._onClickDelete.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
          addnewKey : false,
          checkedArray: [],
          trueArray: [],
          ID:undefined
    
        }
      }
  componentDidMount() {
    //console.log('state in componentWillMount',this.state)
    //console.log('store componentwillMount first')
    pageLoaded('SecureShellKey');
    this.props.dispatch(loadSSHData());
    //console.log('state in componentDidMount')
    
  }

  componentWillReceiveProps (nextProps) {
    
      this.setState({ checkedArray: nextProps.Accountsdetail });
    
  }

 

  componentWillUnmount() {
    //console.log("componentWillUnMount entered");
      const { dispatch } = this.props;
      dispatch(unloadSSH());
  }

 



    _onToggle(event) {

      const { checkedArray } = this.state
      
      let temparray = [];
      temparray = checkedArray
      
      //temparray = checkedArray;
     //console.log('ontoggle temp array',temparray[event.target.id])
         //console.log('temparray', temparray)
      for(var i = 0; i < temparray.length; i++) {
        if(temparray[i].Id == event.target.id) {  
          temparray[i].Checked = !temparray[i].Checked
          //console.log('Test Object',temparray[i].Enabled)
        }
      }
        
        
        //console.log('checkedarrayin ontoggle',temparray)
       //console.log('id',checked)
        //let id = row.Id; 
        this.setState({ checkedArray: temparray });
        
    }

    _onChangeSSHKey(event) {
        this.setState({ [event.target.name]: event.target.value});
       
    }

     

    _onClickNewKey() {
        const {checkedArray} = this.state
        let temparray = [];
        temparray = checkedArray;
        let trueArray = [];
        for (let i=0;i<temparray.length;i++){
          if ( temparray[i].Checked == true){
            trueArray.push(temparray[i].Id)
          }


        }
        //console.log(trueArray)
        if (trueArray.length == 1){

          this.setState({addnewKey: true,trueArray:trueArray})
          /* let PostData = {
            "SshKey": this.state.CurrentValue
          }
          
          
          
          
          this.props.dispatch(AddnewKey(PostData,trueArray[0])) */
        } else{
          alert('You can only add an SSH key to a single user at a time')
        }
       
    }

    _onClickDelete() {
        const {checkedArray} = this.state
        let temparray = [];
        temparray = checkedArray;
        let trueArray = [];
        for (let i=0;i<temparray.length;i++){
          if ( temparray[i].Checked == true){
            trueArray.push({id:temparray[i].Id,sshkey:temparray[i].SshKey[0]})
          }


        }
        //console.log(trueArray)
        if (trueArray.length == 1 ){
          if(trueArray[0].sshkey != null){
              let PostData = {
                "SshKey": trueArray[0].sshkey
              }
            //console.log(PostData)

              this.props.dispatch(DeleteSSHKey(PostData,trueArray[0].id))
              //this.setState({checkedArray: this.props.Accountsdetail}) 
            }else if(trueArray[0].sshkey == null){
              alert('No SSH key Available');
              
            }
          
        } else{
          alert('You can only Delete SSH keys to a single user at a time')
        }
      
      }

      _onSubmit() {
        const { trueArray } = this.state
          let PostData = {
            "SshKey": this.state.SshKey
          }
          
          this.props.dispatch(AddnewKey(PostData,trueArray[0]))
          this.setState({addnewKey: false}) 
      }


    render() {
        //console.log("render emtered")
       //console.log("in render",this.props.Accountsdetail)
        if (this.state.checkedArray.length == 0){
          this.state.checkedArray = this.props.Accountsdetail;
        }
       //console.log("in render",this.state.checkedArray)

        const sshData = this.state.checkedArray.map((account) =>{
          const sskkeys = account.SshKey.map((sshKey) => 
         <span>{sshKey}  </span>
        )
  
        return (
        <TableRow ><td><CheckBox id={account.Id}  toggle={false} name={account.Id}
          checked={account.Checked}
          onChange={this._onToggle} disabled={this.props.accountType== 'admin'? false:true} /></td><td>{account.Name}</td><td>{sskkeys}</td>
        </TableRow>
        )
        }
     )
    

     let AddKeyForm;
     if (this.state.addnewKey == true){
       AddKeyForm = (
         <div>
           
                <Section pad="medium">
                <Title >Public Key Import Data</Title>
                <Paragraph>Paste the PEM encoded public key in the area below, and click 'Import Public Key'</Paragraph>
                <input id="SshKey" name="SshKey" type="text"
                value={this.state.SshKey}
                onChange={this._onChangeSSHKey} disabled={this.props.accountType== 'admin'? false:true} />
                <Footer pad={{vertical: 'medium'}} justify="between">
                <Button primary={true} label='Import Public Key'
                  onClick={this.props.accountType== 'admin'? this._onSubmit:null} />
         
                </Footer>

                </Section>


           </div>

       )


     }

        return (
            <Box >
        
                <Section pad="medium">
                        
                    <Title >Authorized SSH Keys</Title>

                    
                        
                    <Table>
                    <TableHeader labels={['','User Name','SSH Keys']}/>
                        <tbody>
                        {sshData}
                        </tbody>
                    </Table>
                    <Footer pad={{"vertical": "small"}}>
                        <Box pad='small'><Button label='Authorize New Key' onClick={this.props.accountType== 'admin'? this._onClickNewKey:null}/></Box>
                        <Box pad='none'><Button  label='Delete Selected Key(s)' onClick={this.props.accountType== 'admin'? this._onClickDelete:null} /></Box>
                  
                    </Footer>
                  </Section>
                {AddKeyForm}
                
                        
            </Box>
        );
    }
};

SecureShellKey.defaultProps = { 
    Accountsdetail: [],
    router: PropTypes.object.isRequired,
  };
  
  
  
  SecureShellKey.propTypes = {
    dispatch: PropTypes.func.isRequired,
    Accountsdetail: PropTypes.arrayOf(PropTypes.object)
  };
  
  
  
  
  
  const select = state => ({ ...state.SSH,...state.session });
  
  export default connect(select)(SecureShellKey);

