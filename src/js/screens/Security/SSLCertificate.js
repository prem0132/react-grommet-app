import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Grommet, App, Header } from 'grommet';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
//import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import store from '../../store';
import { pageLoaded } from '../utils';
import { loadsslCertificate, unloadsslCertificate } from '../../actions/Security/sslCertificate';



class SSLCertificate extends Component {

    constructor(props){
        super(props);
        // this.state ={
        //     // certificate: {
        //     //     X509CertificateInformation:{
        //         //     C: undefined,
        //         //     CN: undefined,
        //         //     L: undefined,
        //         //     O: undefined,
        //         //     OU: undefined,
        //         //     ST: undefined
        //         // },
        //         Issuer: undefined,
        //         SerialNumber: undefined,
        //         IssuedTo: undefined,
        //         ValidNotAfter: undefined,
        //         ValidNotBefore: undefined,
        //     // },
        //     error:undefined
        // // }
    }

    componentDidMount() {
        //console.log('Component did mount begins')
        pageLoaded('SSLCertificate');
        this.props.dispatch(loadsslCertificate());
       }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(unloadsslCertificate());
       }

    render() {
        let body;
        
        
        //console.log('this.props',this.props.IssuedTo,this.props.Issuer);
        
            body = (
                <div>
                <TableRow><td><strong>Issued To</strong></td><td>C = {this.props.IssuedTo.C}, CN = {this.props.IssuedTo.CN}, 
                    L = {this.props.IssuedTo.L}, O = {this.props.IssuedTo.O}, OU = {this.props.IssuedTo.OU}, ST = {this.props.IssuedTo.ST}</td></TableRow>
                <TableRow><td><strong>Issued By</strong></td><td>C = {this.props.Issuer.C}, CN = {this.props.Issuer.CN}, 
                    L = {this.props.Issuer.L}, O = {this.props.Issuer.O}, OU = {this.props.Issuer.OU}, ST = {this.props.Issuer.ST}</td></TableRow>
                <TableRow><td><strong>Valid From</strong></td><td>{this.props.ValidNotBefore}</td></TableRow>
                <TableRow><td><strong>Valid Until</strong></td><td>{this.props.ValidNotAfter}</td></TableRow>
                <TableRow><td><strong>Serial Number</strong></td><td>{this.props.SerialNumber} </td></TableRow>    
                </div>
            );
        
        
        return (
            <Box justify='start'
                align='start'>
                        
                <Section pad="medium">
                        <Title >SSL Certificate Information</Title>
                        <Table>
                            <tbody>
                                {body} 
                            </tbody>
                        </Table>
                        <Footer pad={{"vertical": "small"}}>
                            <Button label='Customize Certificate' type={this.props.accountType== 'admin'? 'submit':null} primary={true} path={this.props.accountType== 'admin'? '/SSLCertificate/CustomizeCert':null}/>
                        </Footer>
                </Section>
            </Box>
        );
    }
}

SSLCertificate.propTypes = {
    certificate: PropTypes.object
  };
  
  
  
const select = state => ({ ...state.certificate,...state.session });
  
export default connect(select)(SSLCertificate);


