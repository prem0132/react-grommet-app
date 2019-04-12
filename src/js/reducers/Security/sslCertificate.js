
import { CERTIFICATE_LOAD, CERTIFICATE_UNLOAD, CERTIFICATE_LOAD_FAILURE,CSR_CERTIFICATE_LOAD } from '../../actions';
import { createReducer } from '../utils';



const initialState = {
    certificate:undefined,
    //  certificate: {
    //     X509CertificateInformation:{
            // C: undefined,
            // CN: undefined,
            // L: undefined,
            // O: undefined,
            // OU: undefined,
            // ST: undefined,
            Issuer: {
                C:undefined,
                CN: undefined,
                L: undefined,
                O: undefined,
                OU: undefined,
                ST: undefined
            },
            IssuedTo: {
                C:undefined,
                CN: undefined,
                L: undefined,
                O: undefined,
                OU: undefined,
                ST: undefined
            },
            SerialNumber: undefined,
            // IssuedTo: undefined,
            ValidNotAfter: undefined,
            ValidNotBefore: undefined,
        // }
    // },
    error: undefined
  };
  
  const handlers = {
      [CERTIFICATE_LOAD]: (state, action) => {//console.log('reducer cert', action.payload.X509CertificateInformation.Subject);
          if(!action.error){
              return {
                Issuer:{
                    C: action.payload.X509CertificateInformation.Issuer.Country,
                    CN: action.payload.X509CertificateInformation.Issuer.CommonName,
                    L: action.payload.X509CertificateInformation.Issuer.City,
                    O: action.payload.X509CertificateInformation.Issuer.OrgName,
                   OU: action.payload.X509CertificateInformation.Issuer.OrgUnit,
                    ST: action.payload.X509CertificateInformation.Issuer.State,

                },
                IssuedTo:{
                    C: action.payload.X509CertificateInformation.Subject.Country,
                    CN: action.payload.X509CertificateInformation.Subject.CommonName,
                    L: action.payload.X509CertificateInformation.Subject.City,
                    O: action.payload.X509CertificateInformation.Subject.OrgName,
                   OU: action.payload.X509CertificateInformation.Subject.OrgUnit,
                    ST: action.payload.X509CertificateInformation.Subject.State,



                },

                  //Issuer: action.payload.X509CertificateInformation.Issuer,
                  //IssuedTo: action.payload.X509CertificateInformation.Subject,
                  SerialNumber: action.payload.X509CertificateInformation.SerialNumber,
                  ValidNotAfter: action.payload.X509CertificateInformation.ValidNotAfter,
                  ValidNotBefore: action.payload.X509CertificateInformation.ValidNotBefore
              };
          }
          return {error:action.error};
      },
      [CSR_CERTIFICATE_LOAD]: (state,action) => {
          //console.log('reducer CSR_CERTIFICATE_LOAD');
      return {
          certificate: action.payload.CertificateSigningRequest
        };
      },
      [CERTIFICATE_LOAD_FAILURE]: (state,action) => {//console.log('reducer CERTIFICATE_LOAD_FAILURE');
          return {
              error: action.error
          };
      },
      [CERTIFICATE_UNLOAD]: ()  => {
          ({ ...initialState})
      }
  }

  export default createReducer(initialState, handlers);