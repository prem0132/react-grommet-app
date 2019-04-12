import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import Section from 'grommet/components/Section';
import FormFields from 'grommet/components/FormFields';
import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import ListItem from 'grommet/components/ListItem';
import List from 'grommet/components/List';
import Spinning from 'grommet/components/icons/Spinning';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Label from 'grommet/components/Label';
import RadioButton from 'grommet/components/RadioButton';
import Select from 'grommet/components/Select';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadbootorder, unloadbootorder, changebootorder } from '../../actions/Administration/BootOrder';


class Boot_Order extends Component {

    constructor(props){
        super(props);
        //console.log(store.getState());
        
        this._selected = this._selected.bind(this);
        this._onUp = this._onUp.bind(this);
        this._onDown =  this._onDown.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._buttonstatus = this._buttonstatus.bind(this);
        this.state = {
            DefaultBootOrder: [],
            selectedindex: undefined,
            selected: undefined
        };
    }


        
  
     componentDidMount() {
        pageLoaded('Boot_Order');
        this.props.dispatch(loadbootorder());
       } 
    
       componentWillUnmount() {
       const { dispatch } = this.props;
        dispatch(unloadbootorder());
      }

      _selected(event){
       //console.log('_selected(option)',event.target.id)
        this.setState( { selected: [event.target.id]});
    }

    _onUp(){
        //console.log('_selected(option)',option.option)
        //this.setState( { selected: option.option});
        let temparray = Object.values([this.state.DefaultBootOrder][0])
        //console.log('temparray',temparray,'this.state.selected',this.state.selected)
        for(var i = 0; i < temparray.length; i++) {
            if(temparray[i] == this.state.selected) {
                //console.log('temparray[i]',temparray[i],'this.state.selected',this.state.selected)
                this.state.selectedindex = i;
            }
        }
        if(this.state.selectedindex > 0){
        var temp = temparray[this.state.selectedindex];
        temparray[this.state.selectedindex] = temparray[this.state.selectedindex-1];
        temparray[this.state.selectedindex-1] = temp;

        }
        else{
            return 0
        }
        this.setState({ DefaultBootOrder: temparray}) 
    }


    _onDown(option){
         let temparray = Object.values([this.state.DefaultBootOrder][0])
        //console.log('temparray',temparray,'this.state.selected',this.state.selected)
        for(var i = 0; i < temparray.length; i++) {
            if(temparray[i] == this.state.selected) {
                //console.log('temparray[i]',temparray[i],'this.state.selected',this.state.selected)
                this.state.selectedindex = i;
            }
        }
        if(this.state.selectedindex < temparray.length -1){
        var temp = temparray[this.state.selectedindex];
        temparray[this.state.selectedindex] = temparray[this.state.selectedindex+1];
        //console.log('temparray[this.state.selectedindex replaced]',temparray[this.state.selectedindex])
        temparray[this.state.selectedindex+1] = temp;

        }
        else{
            return 0
        }
        this.setState({ DefaultBootOrder: temparray}) 

    }

    _onSubmit(){
        //console.log("first elememnt ", this.state.DefaultBootOrder[0])
        //console.log('this.state SUBMIT',this.state,'this.state.DefaultBootOrder sUBMIT',this.state.DefaultBootOrder)
        //alert('stop')
        this.props.dispatch(changebootorder({DefaultBootOrder: this.state.DefaultBootOrder}))
    }

    _buttonstatus(Boot){
        //console.log("button status", Boot)
        if(Boot == this.state.selected){
            return true;
        }
        else{
            return false;
        }
    }

      
  render() {

    if(this.props.DefaultBootOrder == undefined){
        //console.log("loadingdata")
        return(
          <Box>
            <Header><h4><Spinning />Loading Data</h4></Header>
            </Box>
        )
      }

    //console.log('this.state in render:',this.state,'keys',Object.keys([this.state.DefaultBootOrder]),"value",Object.values([this.state.DefaultBootOrder]),'PROPS', this.props)



    if(this.state.DefaultBootOrder.length == 0){
         //console.log('if block executed before',this.state)
         this.state.DefaultBootOrder= this.props.DefaultBootOrder         
         }


    const BootOrder = Object.values([this.state.DefaultBootOrder][0]).map((Boot) =>
        <RadioButton id={Boot}
        name={Boot}
        label={Boot}
        disabled={this.props.accountType== 'admin'? false:true}
        checked={this._buttonstatus(Boot)}
        onChange={this._selected} />
    );
         
         //console.log('this.state in render:after if',this.state)

        return ( 
      
          <Box justify='start'
                  align='start'
                  wrap={true}
                  pad='large'
                  margin='small'
                  colorIndex='light-1'
                  >
                  <Form>
                      <Section>
                        <Table>
                            <tbody>
                                <TableRow><td>Virtual Floppy/USB key:</td><td></td></TableRow>
                                <TableRow><td>Virtual CD/DVD-ROM:</td><td></td></TableRow>
                            </tbody>
                        </Table>
                          
                        {/* Boot mode not supported
                        <FormFields>
                          <FormField>
                          <Box pad='small'><label>Boot Mode</label></Box>
                            <RadioButton id='choice1-1'
                              name='choice1-1'
                              label='Unified Extensible Firmware Interface (UEFI)'
                              checked={true}
                              onChange='' />
                            <RadioButton id='choice1-2'
                              name='choice1-2'
                              label='Legacy BIOS'
                              checked={false}
                              onChange='' />
                          </FormField>
                        </FormFields>

                        <Footer pad={{"vertical": "medium"}}>
                            <Button label='Apply'
                                  align='center'
                                  type='submit'
                                  primary={true}
                                  onClick='' />
                        </Footer> */}
                          
                      </Section>


                      <Section>
                          <Header>
                              <Title>
                              Server Boot Order
                              </Title>
                          </Header>
                          <FormFields>
                              <FormField>
                            {BootOrder}
                            </FormField>
                            </FormFields>


                          <Footer pad={{"vertical": "medium"}}>
                              
                              <Box pad='small'><Button label='Apply'
                                  primary={true}
                                  type={this.props.accountType== 'admin'? 'submit':null}
                                  onClick ={this.props.accountType== 'admin'? this._onSubmit:null}/></Box>

                              <Box pad='none'><Button label='Up'
                                  align='start'
                                  type={this.props.accountType== 'admin'? 'button':null}
                                  onClick={this.props.accountType== 'admin'? this._onUp:null} /></Box>

                              <Box pad='small'><Button label='Down'
                                  align='start'
                                  type={this.props.accountType== 'admin'? 'button':null}
                                  onClick={this.props.accountType== 'admin'? this._onDown:null}/></Box>
                          </Footer>
                          
                      </Section>
                     {/* <Section>
                          <Header>
                              <Title>
                              One-Time Boot Status
                              </Title>
                          </Header>
                          <FormFields>
                            <FormField><TextInput id='item1' name='item-1' value='Primary Time Server'/></FormField>
                            <FormField>
                                <Box pad='small'><label>Current One-Time Boot Option:</label></Box>
                            
                              <Select placeHolder='None'
                                options={['no one time boot menu', 'CD DVD Drive']}
                                value='no one time boot menu'
                                onChange=''/>
                            </FormField>

                            <FormField>
                            <Box pad='small'><label>Select UEFI Target Option:</label></Box>
                              
                              <Select placeHolder='None'
                                options={['windows boot manager']}
                                value={undefined}
                                onChange=''/>
                            </FormField>
                          </FormFields>

                          <Footer pad={{"vertical": "medium"}}>
                              
                              <Button label='Apply'
                                  align='center'
                                  type='submit'
                                  primary={true}
                                  onClick='' />
                          </Footer>
                          
                    </Section> */}
                  </Form>  
          </Box>
        );
  }
};

Boot_Order.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  
  
  
  const select = state => ({ ...state.BootOrder,...state.session });
  
  export default connect(select)(Boot_Order);
