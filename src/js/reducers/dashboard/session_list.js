
import { SESSIONLIST_LOAD, SESSIONLIST_UNLOAD, SESSIONLIST_FAILURE } from '../../actions';
import { createReducer } from '../utils';

const initialState = {
    error: undefined,
    sessionList: [{
        odataId: undefined,
        Id: undefined,        
        LoginTime: undefined,
        UserIP: undefined,
        UserTag: undefined,//source
        UserExpires: undefined,
        AccessTime: undefined,
        UserName: undefined,
    }],
    membersCount: undefined,
    mySession: {
        Id: undefined,
        
                LoginTime: undefined,
                UserIP: undefined,
                UserTag: undefined,//source
                UserExpires: undefined,
                AccessTime: undefined,

        UserName: undefined
    }
}

const handlers = {
    [SESSIONLIST_LOAD]: (state, action) => {
        if(!action.error){
             const sessionList = [];
             
            for(let i=0; i < action.payload.Members.length; i++)
            {
                sessionList.push({
                    odataId: action.payload.Members[i]["@odata.id"],
                    Id: action.payload.Members[i].Id,
                    LoginTime: action.payload.Members[i].Oem.Hpe.LoginTime,
                    UserIP: action.payload.Members[i].Oem.Hpe.UserIP,
                    UserTag: action.payload.Members[i].Oem.Hpe.UserTag,
                    UserExpires: action.payload.Members[i].Oem.Hpe.UserExpires,
                    AccessTime: action.payload.Members[i].Oem.Hpe.AccessTime,
                    UserName: action.payload.Members[i].UserName
                })
            }
            
            //console.log(sessionList, action.payload.Oem.Hpe.Links.MySession["@odata.id"].UserName);
            return({
                mySession:{
                    Id: action.payload.Oem.Hpe.Links.MySession["@odata.id"].Id,
                    LoginTime: action.payload.Oem.Hpe.Links.MySession["@odata.id"].Oem.Hpe.LoginTime,
                    UserIP: action.payload.Oem.Hpe.Links.MySession["@odata.id"].Oem.Hpe.UserIP,
                    UserTag: action.payload.Oem.Hpe.Links.MySession["@odata.id"].Oem.Hpe.UserTag,
                    UserExpires: action.payload.Oem.Hpe.Links.MySession["@odata.id"].Oem.Hpe.UserExpires,
                    AccessTime: action.payload.Oem.Hpe.Links.MySession["@odata.id"].Oem.Hpe.AccessTime,
                    UserName: action.payload.Oem.Hpe.Links.MySession["@odata.id"].UserName
                }, 
                membersCount: action.payload.Members.length,
                sessionList: sessionList
            });
        }
        return{ error:action.error};
    },
    [SESSIONLIST_UNLOAD]: (state, action) => {
        ({ ...initialState })
    },
    [SESSIONLIST_FAILURE]: (state, action) => {
        return {
            error: action.error
        };
    }
}

export default createReducer (initialState, handlers);