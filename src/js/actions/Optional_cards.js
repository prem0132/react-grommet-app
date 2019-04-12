import { OPTIONALCARDS_LOAD, OPTIONALCARDS_UNLOAD, OPTIONALCARDS_LOAD_FAILURE } from './index';
import {getItem,patchNetworkGeneral} from './utils';

export function loadOptionalCards() {
    //console.log('load Optional cards in action')
  return dispatch => {
   getItem('/redfish/v1/Systems/1/OptionCard')
   .then(payload => dispatch(loadOptionalCardsSuccess(payload)))
   .catch(error => dispatch(loadOptionalCardsFailure(error)))
  };
}


export function changeSerialPortSettings(SerialPortSettings){
  //console.log(SerialPortSettings);
  const data = JSON.stringify(SerialPortSettings);

  return dispatch => (
      patchNetworkGeneral('/redfish/v1/Systems/1/OptionCard', data)
      .then(response => response.json())
      .then(response => { 
          //console.log('Patch payload',response)
          dispatch({ type:OPTIONALCARDS_LOAD, payload: response});
      })
      .catch(payload => {
        //console.log('Error');
          dispatch({
              type: OPTIONALCARDS_LOAD_FAILURE,
              error: true
          })
      })
  )

}


export function unloadOptionalCards() {
    //console.log('unload OptionalCards called')
    return { type: OPTIONALCARDS_UNLOAD };
   }


export function loadOptionalCardsSuccess(payload){
  //console.log('payload=',payload);
  return { type:OPTIONALCARDS_LOAD, payload: payload };
}

export function loadOptionalCardsFailure(error){
  return {type:OPTIONALCARDS_LOAD_FAILURE, error: error};
}

