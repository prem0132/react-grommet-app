import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Section from 'grommet/components/Section';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
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
import CheckBox from 'grommet/components/CheckBox';
import CloseIcon from 'grommet/components/icons/base/Close';
import Layer from 'grommet/components/Layer';
import Paragraph from 'grommet/components/Paragraph';
import store from '../../store';


import { GenerateCSR,ImportCert } from '../../actions/Security/sslCertificate';




class CustomizeCertificate extends Component {

   constructor (props) {
    super(props);
    this._onSubmitCSR = this._onSubmitCSR.bind(this);
    this._onSubmitCertificate = this._onSubmitCertificate.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onChangeCheckBox = this._onChangeCheckBox.bind(this);
    this._onImport = this._onImport.bind(this);
    this.state = {
        Country:undefined,
        CertificateText:undefined,
        State: undefined,
        City: undefined,
        OrgName: undefined,
        CommonName: undefined,
        OrgUnit: undefined,
        IsEnabled:false,
        errors: {},
        Certificate: undefined,
        showcertificateLayer: false,
        showImportLayer: false
      
    };
  }

  componentWillMount() {
    //console.log("in component will mount",store.getState())
    this.state.Country = store.getState().certificate.IssuedTo.C;
    this.state.State= store.getState().certificate.IssuedTo.ST;
    this.state.City= store.getState().certificate.IssuedTo.L;
    this.state.OrgName= store.getState().certificate.IssuedTo.O; 
    this.state.OrgUnit = store.getState().certificate.IssuedTo.OU;
    this.state.CommonName = store.getState().certificate.IssuedTo.CN; 
  }

  componentWillReceiveProps (nextProps) {
    //console.log('in will receive',nextProps.certificate)
    this.setState({
        Certificate:nextProps.certificate,
    });
  
  }
 
  _onSubmitCSR(){
      //console.log('ON SUBMIT CSR',this.state.City)
       
      let UserData={

           "City":this.state.City,
           "CommonName":this.state.CommonName,
           "Country": this.state.Country,
           "OrgName": this.state.OrgName,
           "OrgUnit": this.state.OrgUnit,
           "State": this.state.State,
           "IncludeIP": this.state.IsEnabled
      }
        //console.log(AddUserData)
      this.props.dispatch(GenerateCSR(UserData))
      this.setState({showcertificateLayer: true})
        //window.location.href = '/Security';
       
  }

  _onImport(){
    //console.log('_onImport screens',this.state.CertificateText)
    // let certificateText=this.state.CertificateText.replace("↵", "\n")
    let UserData={
      "Certificate": this.state.CertificateText
    }
    //console.log('Before Console',UserData)
    this.props.dispatch(ImportCert(UserData))
     //this.setState({showImportLayer: false})
     //window.location.href = '/Security';
  }


  _onClose(){
    //console.log('ON SUBMIT CSR',this.state.City)
    this.setState({showcertificateLayer: false,showImportLayer: false,CertificateText: undefined})
  }

  _onSubmitCertificate(){
    this.setState({showImportLayer: true})
  }

  _onChangeCheckBox () {
    this.setState({ IsEnabled: !this.state.IsEnabled});
  }
  
  _onChange (event) {
    this.setState({ [event.target.name]: event.target.value});
  }
 
  render () {
    const {Country,State,City,OrgName,OrgUnit,CommonName,IsEnabled} = this.state;
      //console.log(this.props.IssuedTo)
    let CertificateLayer;
    if (this.state.showcertificateLayer == true){
          CertificateLayer = (
            <Layer align="center" closer={true} onClose={this._onClose}>
            <Box justify='center'
                  align='center'
                  pad='small'
                  margin='small'
                  colorIndex='light-1'
                  >
              <Form pad={{horizontal: 'none'}} size="large" plain={true}>
                
                  <Header>
                    <Title>
                    Certificate Signing Request
                    </Title>
                    
                  </Header>
  
                  <Paragraph>The following base64-encoded data may be used to request a certificate from a certificate server. 
                      Copy the data below and use it to make a certificate request.</Paragraph>
                
  
                <Section size="large" full='horizontal'>
                    
                    <FormFields>
                      <FormField label= 'Certificate'>
                        <textarea rows={13} value={this.state.Certificate} />
                      </FormField>
                    </FormFields>
                </Section>
                
              </Form>
            </Box> 
          </Layer>   

            

        )
    }
    

    let ImportLayer;
    if(this.state.showImportLayer == true){
      ImportLayer = (
        <Layer align="center" closer={true} onClose={this._onClose}>
          <Box justify='center'
                align='center'
                pad='small'
                margin='small'
                colorIndex='light-1'
                >
            <Form pad={{horizontal: 'none'}} size="large" plain={true}>
              
                <Header>
                  <Title>
                    Import a Certificate
                  </Title>
                  
                </Header>

                <Paragraph>Paste the base64-encoded X.509 Certificate in the area below, and click 'Import'</Paragraph>
              

              <Section size="large" full='horizontal'>
                  
                  <FormFields>
                    <FormField label= 'Certificate'>
                      <textarea rows={13} id='CertificateText' name='CertificateText' value={this.state.CertificateText}  onChange={this._onChange} />
                    </FormField>
                  </FormFields>
              </Section>
              <Footer pad={{"vertical": "small"}}>
                <Box pad='none'><Button primary={true} label='Import' type='button' onClick={this._onImport}/></Box>
              </Footer>
            </Form>
          </Box> 
        </Layer>    
        )
      }
    

    return (
      <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
        <Form  >
          <Header size="large" justify="between" pad="none">
            <Heading tag="h3" margin="none" strong={true}>
                Certificate Signing Request Information
            </Heading>
            <Anchor path='/Security' icon={<CloseIcon />} />
          </Header>
          <FormFields>
                <fieldset>
                  <FormField htmlFor="Country" label="Country (C)" >
                    <input  id="Country" name="Country" type="text"
                      value={this.state.Country} onChange={this._onChange} />
                  </FormField>
                  <FormField htmlFor="State" label="State (ST)" >
                  <input id="State" name="State" type="text"
                      value={this.state.State} onChange={this._onChange} />
                  </FormField>
                  <FormField htmlFor="City" label="City or Locality (L)" >
                  <input  id="City" name="City" type="text"
                      value={this.state.City} onChange={this._onChange} />
                  </FormField>
                  <FormField htmlFor="OrgName" label="Organization Name (O)" >
                  <input  id="OrgName" name="OrgName" type="text"
                      value={this.state.OrgName} onChange={this._onChange} />
                  </FormField>
                  <FormField htmlFor="OrgUnit" label="Organizational Unit (OU)" >
                  <input  id="OrgUnit" name="OrgUnit" type="text"
                      value={this.state.OrgUnit} onChange={this._onChange} />
                  </FormField>
                  <FormField htmlFor="CommonName" label="Common Name (CN)" >
                  <input  id="CommonName" name="CommonName" type="text"
                      value={this.state.CommonName} onChange={this._onChange} />
                  </FormField>
                  <FormField>
                    <CheckBox label='include iLO EDGE IP Address(es)'
                              toggle={false}
                              disabled={false}
                              reverse={false}
                              checked={this.state.IsEnabled}
                              onChange={this._onChangeCheckBox} />
                  </FormField>
              </fieldset>
          </FormFields>

          <Footer pad={{vertical: 'medium'}} justify="between">
            <Button type="button" primary={true} label='Generate CSR'
              onClick={this._onSubmitCSR} />
            <Button type="button" primary={true} label='Import Certificate'
              onClick={this._onSubmitCertificate} />
          </Footer> 
        </Form>

        <Heading tag="h3" margin="none" strong={true}>
         Import a Certificate
        </Heading>
        <span>
          <div>The iLO Edge security features can be enhanced by importing a trusted certificate. iLO Edge can create a Certificate Signing Request (CSR) in PKCS #10 format to send to a Certificate Authority (CA). The CSR is base64-encoded. The CA processes the request and returns a response (X.509 Certificate) to import to iLO Edge.</div><br/>

          There are four steps to importing a certificate:<br/>
          Generate a CSR.<br/>
          Send the CSR to a CA and receive a certificate.<br/>
          Import the certificate into iLO Edge.<br/>
          Relogin to iLO Edge.<br/>

        
        </span>
        {CertificateLayer}
        {ImportLayer}
      </Article>
    );
  }
}

CustomizeCertificate.propTypes = {
    certificate: PropTypes.object
};

const select = state => ({ ...state.certificate });

export default connect(select)(CustomizeCertificate);