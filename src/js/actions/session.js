import { SESSION_LOAD, SESSION_LOGIN, SESSION_ARGS_UPDATE, SESSION_LOGOUT } from '../actions';
// import { deleteSession, postSession } from '../api/session';
// import { updateHeaders, headers } from '../api/utils';
import { putItem, updateHeadersEsc, deleteTokenLogout,getItem } from './utils';

import { postItemLoginEsc } from './utils';

const localStorage = window.localStorage;

export function initialize() {
  return (dispatch) => {
    //console.log('initialize')
    //const { email, name, token } = localStorage;
    const {UserName, token } = localStorage;
    let {accountType} = localStorage;
    //if (email && token) {
      if (UserName && token ) {
      dispatch({
        //type: SESSION_LOAD, payload: { email, name, token }
        
        type: SESSION_LOAD, payload: { UserName, token }
      });
      //console.log('after dispatch')

      if(accountType === undefined){
        getItem('/redfish/v1/AccountService/Accounts?expand=1')
        .then((adminpayload) => {
        for(let i=0;i<adminpayload.Members.length;i++){
           if (adminpayload.Members[i].UserName == UserName ){
                accountType = adminpayload.Members[i].RoleId; 
                //console.log(accountType)
              }
            }
          })
        .catch(error => {
          console.log('Failed to get user/admin');
          //window.location = '/login';
        })
      }
      const sessionArgsUpdate = {};
      sessionArgsUpdate['UserName'] = UserName;
      sessionArgsUpdate['token'] = token;
      sessionArgsUpdate['accountType'] = accountType;
      console.log(sessionArgsUpdate)
      dispatch({type: SESSION_ARGS_UPDATE, sessionArgsUpdate});
      updateHeadersEsc({'x-auth-token':token});
    } else {
      //window.location = '/login';
    }
  };
}

// export function login(email, password, done) {
//   let UserName = email;
//   let Password = password;
	export function login(UserName, Password, done) {
  const item = JSON.stringify({ UserName, Password });
  return dispatch => (
    //postItemEsc('/redfish/v1/Sessions', item )
    postItemLoginEsc('/redfish/v1/Sessions', item)

      .then((payload) => {
        
        //updateHeaders({ Auth: payload.token });
        //
        
        //updateHeadersEsc({'x-auth-token':payload.headers.get('x-auth-token')});
        
        dispatch({ type: SESSION_LOGIN, payload });
        try {
          //localStorage.email = payload.email;
          localStorage.UserName = UserName;
          //localStorage.token = payload.token;
          let token = payload.headers.get('x-auth-token');
          localStorage.token = token;
          updateHeadersEsc({'x-auth-token':token});

          let accountType = undefined;
          getItem('/redfish/v1/AccountService/Accounts?expand=1')

          .then((adminpayload) => {
             //console.log("adminpayload in action = ",adminpayload);
          
    
            for(let i=0;i<adminpayload.Members.length;i++){

        
              if (adminpayload.Members[i].UserName == UserName ){
                
                accountType = adminpayload.Members[i].RoleId; 
             }
            }
          
            //console.log("adminpayload2 in action = ",accountType);
            
            //update the session items in store
          const sessionArgsUpdate = {};
          sessionArgsUpdate['UserName'] = UserName;
          sessionArgsUpdate['token'] = token;
          sessionArgsUpdate['accountType'] = accountType;
          //console.log('in actions',sessionArgsUpdate)
          dispatch({type: SESSION_ARGS_UPDATE, sessionArgsUpdate});
          localStorage.accountType = accountType;



        })

        

        } catch (e) {
          alert(
            'Unable to preserve session, probably due to being in private ' +
            'browsing mode.'
          );
        }
        done();
      })
      .catch(payload => {
        dispatch({
        type: SESSION_LOGIN,
        error: true,
        payload: {
          //Need to relook why status and statusText are blank
          //statusCode: payload.status, message: payload.statusText
          statusCode: payload.status, message: payload
        }
      })})
  );
}

export function logout(session) {
  return (dispatch) => {
    deleteTokenLogout('/redfish/v1/Sessions', session.token)
    // .then(() => {
      
      dispatch({ type: SESSION_LOGOUT });
      // deleteSession(session);
      updateHeadersEsc({ Auth: undefined });
      // try {
        
        localStorage.removeItem('UserName');
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
        
      // } catch (e) {
      // ignore
      // }
  // })
  window.location.href = '/login'; // even if redfish fail to delete token, go to login.
};
}
