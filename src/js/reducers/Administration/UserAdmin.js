import {  USERADMIN_LOAD,USERADMIN_LOAD_FAILURE, USERADMIN_UNLOAD, USERADMINEDIT_LOAD } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
    Accountsdetail : [],
    account:{},
    accountid:undefined
};

const handlers = {

  [USERADMIN_LOAD_FAILURE]: (state, action) => { 
    return ({...initialState})
  },

  [USERADMIN_LOAD]: (state, action) => {
    const Accountsdetail = [];
    
    
    for(let i=0;i<action.payload.Members.length;i++){
      
      //console.log("Action Reducers payload = ",action.payload.Members[i].Id);

    

      Accountsdetail.push({
        Name: action.payload.Members[i].UserName,
        Id: action.payload.Members[i].Id,
        Role: action.payload.Members[i].RoleId,
    });
  
   
          
    //console.log("Action Reducers payload  = ", Accountsdetail );   
   
    }

    
    
      return{Accountsdetail: Accountsdetail
                                         
      };      
  },



  [USERADMINEDIT_LOAD]: (state, action) => {
    
    let accountid = undefined;
    
    for(let i=0;i<action.payload.Members.length;i++){
      //console.log("Action Reducers payload = ",action.id);
      //console.log("Action Reducers payload = ",action.payload.Members[i].Id);

      if (action.payload.Members[i].Id == action.id ){
        
        //console.log("in if condition  = ", i ); 
        accountid = i; 
     }

     
  
   
          
      
   
    }

    //console.log("Action Reducers ID account INFO = ",action.payload.Members[accountid]);
    
      return{
                account : action.payload.Members[accountid]                            
      };      
  },


  [USERADMIN_UNLOAD]: () => {
    ({ ...initialState})
  }
 /*  [BOOTORDER_UNLOAD]: () => initialState this resets to initial state*/
}; 

export default createReducer(initialState, handlers); 