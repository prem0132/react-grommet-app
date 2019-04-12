import { SSH_LOAD,SSH_LOAD_FAILURE,SSH_UNLOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
    Accountsdetail : [],
    account:{},
    accountid:undefined,
    Checked: false
};

const handlers = {

  [SSH_LOAD_FAILURE]: (state, action) => { 
    return ({...initialState}) 
  },

  [SSH_LOAD]: (state, action) => {
    const Accountsdetail = [];
    
    
    for(let i=0;i<action.payload.Members.length;i++){
      
      //console.log("Action Reducers payload = ",action.payload.Members[i].Id);

    

      Accountsdetail.push({
        Name: action.payload.Members[i].UserName,
        Id: action.payload.Members[i].Id,
        SshKey: action.payload.Members[i].Oem.Hpe.SshKeys,
        Checked: false
    });
  
   
          
    //console.log("Action Reducers payload  = ", Accountsdetail );   
   
    }

    
    
      return{Accountsdetail: Accountsdetail
                                         
      };      
  },



  



  [SSH_UNLOAD]: () => {
    ({ ...initialState})
  }
 /*  [BOOTORDER_UNLOAD]: () => initialState this resets to initial state*/
}; 

export default createReducer(initialState, handlers); 