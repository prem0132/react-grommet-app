import { CERTIFICATE_LOAD, CERTIFICATE_UNLOAD, CERTIFICATE_LOAD_FAILURE,CSR_CERTIFICATE_LOAD} from '../../actions';
import {getItem, getSslCert, patchNetworkGeneral,postItemEsc} from '../utils';

export function loadsslCertificate() {
  //console.log('CERTIFICATE_LOAD');
    return dispatch => {
//    getItem('/redfish/v1/Managers/1/SecurityService/HttpsCert/')
getSslCert('/redfish/v1/Managers/1/SecurityService/HttpsCert/')
   .then((payload) => dispatch(loadCertificateSuccess(payload)))
   .catch(error => dispatch(loadCertificateFailure(error)))
  };
}

export function GenerateCSR(UserData) {
  //console.log('GenerateCSR LOAD',UserData);
  const data = JSON.stringify(UserData);
  //console.log('GenerateCSR LOAD2',data);
    return dispatch => {
//    getItem('/redfish/v1/Managers/1/SecurityService/HttpsCert/')
postItemEsc('/redfish/v1/Managers/1/SecurityService/HttpsCert/Actions/HpeHttpsCert.GenerateCSR/',data)
   .then(response => 
    //console.log('in act',payload) 
    dispatch(loadGenerateCSRCertificateSuccess(response)))
   .catch(error => dispatch(loadCertificateFailure(error)))
  };
}

export function ImportCert(UserData) {
  //console.log('ImportCert LOAD',UserData);
  const data = JSON.stringify(UserData);
  //console.log('ImportCert LOAD2',data);
    return dispatch => {
//    getItem('/redfish/v1/Managers/1/SecurityService/HttpsCert/')
postItemEsc('/redfish/v1/Managers/1/SecurityService/HttpsCert/Actions/HpeHttpsCert.ImportCertificate/',data)
   .then((response) => {
     
     alert('certificate import success');
     window.location.href = '/login';
    //dispatch(loadsslCertificate())
  })
   .catch((error) =>{ 
     alert('Import Certificate Error');
    //  window.location.href = '/login';
     dispatch(loadCertificateFailure(error))
    })
  };



}

export function loadGenerateCSRCertificateSuccess(payload){
  //console.log('cert actions', payload);
  return { type:CSR_CERTIFICATE_LOAD, payload: payload };
}


export function unloadsslCertificate() {
    //console.log('CERTIFICATE_UNLOAD')
    return { type: CERTIFICATE_UNLOAD };
   }


export function loadCertificateSuccess(payload){//console.log('cert actions', payload.X509CertificateInformation, payload.X509CertificateInformation.Issuer);
  return { type:CERTIFICATE_LOAD, payload: payload };
}

export function loadCertificateFailure(error){//console.log('CERTIFICATE_LOAD_FAILURE',error);
  return {type:CERTIFICATE_LOAD_FAILURE, error: error};
} 