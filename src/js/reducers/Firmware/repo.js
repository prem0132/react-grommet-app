import { REPO_LOAD, REPO_UNLOAD, REPO_LOAD_FAILURE } from '../../actions/index';
import { createReducer } from '../utils';

const initialState = {
  
  RepoInformation: {},
  ComponentsInfoAr: []
   
};


  const handlers = {
   
    [REPO_LOAD_FAILURE]: (state, action) => {
    return ({...initialState})
    },
    
    [REPO_LOAD]: (state, action) => {
        const ComponentsInfoAr = [];
        
        
        //console.log("Action Reducers payload = ",action.payload.length);
        for(let i=0;i<action.payload[1].Members.length;i++){
        
          
          ComponentsInfoAr.push({
            Name: action.payload[1].Members[i].Name,
          // Version: action.payload[1].Members[i].Version,
          });
        }

       

      return{
        RepoInformation:{ 
          TotalSpace: action.payload["0"].Oem.Hpe.Filesystem.TotalSpace,
          UsedSpace: action.payload["0"].Oem.Hpe.Filesystem.UsedSpace,
          FreeSpace: action.payload["0"].Oem.Hpe.Filesystem.FreeSpace,
          Components:action.payload["0"].Oem.Hpe.Filesystem.Components,
        },
       
          ComponentsInfoAr: ComponentsInfoAr
      }
       
    },
    
    [REPO_UNLOAD]: (state, action) => {
      ({ ...initialState })
    }


  };


export default createReducer(initialState, handlers);
