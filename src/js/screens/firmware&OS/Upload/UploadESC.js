//UPLOAD ESC FORM

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
//import { uploadFirmware } from '../../actions/actions';
import LayerForm from 'grommet-templates/components/LayerForm';
import FormField from 'grommet/components/FormField';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Label from 'grommet/components/Label';
import RadioButton from 'grommet/components/RadioButton';
import Section from 'grommet/components/Section';

//import { getItem, patchItemEsc } from '../../../actions/utils';
import {uploadSoftware, uploadSoftwareURI} from '../../../actions/Firmware/UploadAndUpdate';



class UploadESC extends Component {
  

  constructor () {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onChangeURL = this._onChangeURL.bind(this);
    this.state = {
      currentValue: 'local_file',
      errors: {},
      URL: undefined
    };
  }

  _onChange (type) {
    //console.log('onchange',type)
    this.setState({ currentValue: type })
  }

  _onChangeURL(event) {
    
    this.setState({ URL: event.target.value});
  }

 


  _onSubmit () {

    if(this.state.currentValue==="local_file"){
    let errors = {};
    let noErrors = true;
    let file = this.refs.file.files[0];
   /*  let key = this.refs.file.files[0].name;
    const data = new FormData();
    data.append('file', this.refs.file.files[0]);
    data.append('filename', this.refs.file.files[0].name); */
    if (! file) {
      errors.file = 'required';
      noErrors = false;
    }
    if (noErrors){
      this.props.dispatch(uploadSoftware(file));
	  /* //console.log('file:', file, 'key:', key);
      patchItemEsc('/redfish/v1/UpdateService/SoftwareInventory/', this.refs.file.files[0])
      .then(() => //console.log('success'));; */
      this.props.onClose();
    }else{
      this.setState({ errors: errors });
    }
  } else if(this.state.currentValue === "remotefile" ){
        
    //console.log('remote file in screen:', this.state.URL, this.state.currentValue );
    let postURL = {
      ImageURI : this.state.URL }
    this.props.dispatch(uploadSoftwareURI(postURL));
    this.props.onClose();
  }

    
  }

 
  render () {
    const {URL,currentValue} = this.state;

   
    return (
      <LayerForm title="Upload to Repository" submitLabel="Upload" 
        onClose={this.props.onClose} onSubmit={this._onSubmit}>
        
       <fieldset>
       <FormField label="File Location">
                        
                        <RadioButton id='local_file'
                          
                          name='local_file'
                          label='Local file'
                          checked={'local_file'=== this.state.currentValue}
                          onChange={this._onChange.bind(this, 'local_file')} />
                          <RadioButton id='remotefile'
                          name='remotefile'
                          label='Remote file'
                          checked={'remotefile'===this.state.currentValue}
                          onChange={this._onChange.bind(this, 'remotefile')} />
        </FormField>
        {this.state.currentValue == "remotefile" ? 
        (
          <FormField htmlFor="name" label="URL" >
            <input ref="URL" id="URL" name="URL" type="text"
              value={this.state.URL} onChange={this._onChangeURL} />
          </FormField>
      
        ):(
          

          <FormField label="File" htmlFor="file" error={this.state.errors.file}>
          <input ref="file" id="file" name="file" type="file" />
          </FormField>

        )}
       </fieldset>
      </LayerForm>
    );
  }
}

UploadESC.propTypes = {
  onClose: PropTypes.func,
  
};

export default connect()(UploadESC);

