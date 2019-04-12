
import Rest, { headers, buildQuery, processStatus } from 'grommet/utils/Rest';
let _headers = {
  ...headers,
  'X-API-Version': 200
};

//
//export let urlPrefix = 'http://localhost';
let _host = '';
//export let query = '';
//export let urlPrefix = '';

// Configuration

//export let pageSize = 20;
//export let pollingInterval = 2000; // 2s
// export let urlPrefix = 'http://';
export let urlProtocol = location.protocol;
export let urlPrefix = urlProtocol + '//';
urlPrefix = urlPrefix + location.host;

// export function configure (options) {
//   _host = options.host ? `http://${options.host}` : _host;
//   //pageSize = options.pageSize || pageSize;
//   //pollingInterval = options.pollingInterval || pollingInterval;
  
//   urlPrefix = options.urlPrefix || urlPrefix;

// }

// export function updateHeaders (headers) {
//   _headers = {..._headers, ...headers};
//   Rest.setHeaders(headers);///
// }


// Internal help/generic functions

function _get (uri, params = {}) {
  //console.log("url=",urlPrefix);
  // alert(urlPrefix);
  // alert(uri);
  // alert(query);
  //console.log(_headers);
  //console.log('uri in _get =',_host,urlPrefix,uri,query)
  const options = { method: 'GET', headers: _headers };
  // prevent IE11 to cache resources by adding a timestamp to query params
  params[new Date().getTime()] = '';
  //vinod const query = buildQuery(params);
  const query ='';//vinod
  //console.log('header',headers, 'host', _host, urlPrefix, uri, 'options', options );
  //console.log(fetch(`${_host}${urlPrefix}${uri}${query}`, options));
  //console.log(fetch(`${_host}${urlPrefix}${uri}${query}`, options).then(processStatus));
  //console.log((fetch(`${_host}${urlPrefix}${uri}${query}`, options).then(processStatus).then(response => response.json())));
  return fetch(`${_host}${urlPrefix}${uri}${query}`, options)
    .then(processStatus)
    .then(response => response.json());
}

function _post (uri, dataArg) {
  const data = (typeof dataArg === 'object') ?
    JSON.stringify(dataArg) : dataArg;
  const options = { method: 'POST', headers: _headers, body: data };
  // let ret = fetch(`${_host}${urlPrefix}${uri}`, options)
  //   .then(response => {let result = response.message;}).catch()
    
  //console.log('ret=',ret);
  return fetch(`${_host}${urlPrefix}${uri}`, options)
    .then(processStatus)
    .then(response =>
       //console.log('response=',response.headers.get('x-auth-token'));
      //console.log('response = ', response);
      //console.log('response = ', response.json());
       response.json());
}

function _put (uri, dataArg) {
  const data = (typeof dataArg === 'object') ?
    JSON.stringify(dataArg) : dataArg;
  const options = { method: 'PUT', headers: _headers, body: data };
  return fetch(`${_host}${urlPrefix}${uri}`, options)
    .then(processStatus)
    .then(response => response.json());
}

function _delete (uri) {
  //console.log("uri in _delete:", uri)
  const options = { method: 'DELETE', headers: _headers };
  return fetch(`${_host}${urlPrefix}${uri}`, options)
    .then(processStatus)
    .then(response => response.json());
}


//DELETE WITH AUTH TOKEN
function _deleteforsession (uri) {
  let myheaders = {
    ...headers,
    'X-API-Version': 200,
    'x-auth-token': window.localStorage.token
  };
  //console.log("uri in _delete:", uri)
  const options = { method: 'DELETE', headers: myheaders };
  return fetch(`${_host}${urlPrefix}${uri}`, options)
    .then(processStatus)
    .then(response => response.json());
}


export function head (url, params) {
  const query = buildQuery(params);
  const options = { method: 'HEAD', headers: _headers };
  return fetch(`${_host}${urlPrefix}${url}${query}`, options);
}



export function getItem (uri) {
  //console.log('uri =',uri)
  return _get(uri);
}

export function postItem (item) {
  return _post(`/rest/${item.category}`, item).then(refresh);
}

export function postItemEsc (uri, item) {
  // alert(uri);
  // alert(item);
  //return _post(`/rest/${item.category}`, item).then(refresh);
  return _post(uri, item);
}

export function patchItemEsc (uri, item) {
  // alert(uri);
  // alert(item);
  //return _post(`/rest/${item.category}`, item).then(refresh);
  return _patch(uri, item);
}

function _patch (uri, dataArg) {
 
  //const data = (typeof dataArg === 'object') ?
    //let data = JSON.stringify(dataArg);
    let myheaders = {
      ...headers,
      'X-API-Version': 200,
      //'Content-Type': 'multipart/form-data',
      'x-auth-token': window.localStorage.token
    };
    delete myheaders['Content-Type'];
    //console.log('dataArg:', dataArg)
    //const options = { method: 'PATCH', headers: myheaders, body: dataArg };
    const options = { method: 'PATCH', headers: myheaders, body: dataArg };
  return fetch(`${_host}${urlPrefix}${uri}`,options).then((response) => {
    if(response.ok) {
      return (response.json());
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        alert("oops...You can't upload this file")
       // return Promise.reject(response.statusText || 'Error ' + response.status );
    }
    })

  }

  
export function postItemURIEsc (uri, item) {
  // alert(uri);
  // alert(item);
  //return _post(`/rest/${item.category}`, item).then(refresh);
  return _postItemURIEsc(uri, item);
}

function _postItemURIEsc (uri, dataArg) {
 
  //const data = (typeof dataArg === 'object') ?
    //let data = JSON.stringify(dataArg);
     let myheaders = {
      ...headers,
      'X-API-Version': 200,
      //"Content-Type": undefined,
      'x-auth-token': window.localStorage.token
    };
    delete myheaders['Content-Type']; 
    //console.log('dataArg:', dataArg)
    //const options = { method: 'PATCH', headers: myheaders, body: dataArg };
    const options = { method: 'POST', headers: myheaders, body: dataArg };
  return fetch(`${_host}${urlPrefix}${uri}`,options).then((response) => {
    if(response.ok) {
      return (response.json());
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        alert("oops...You can't upload this file")
       // return Promise.reject(response.statusText || 'Error ' + response.status );
    }
    })

  }

  export function postItemFileEsc (uri, item) {
    // alert(uri);
    // alert(item);
    //return _post(`/rest/${item.category}`, item).then(refresh);
    return _postItemFileEsc(uri, item);
  }
  
  function _postItemFileEsc (uri, dataArg) {
   
    //const data = (typeof dataArg === 'object') ?
      //let data = JSON.stringify(dataArg);
      let myheaders = {
        ...headers,
        'X-API-Version': 200,
        //'Content-Type': 'multipart/form-data',
        'x-auth-token': window.localStorage.token
      };
      delete myheaders['Content-Type'];
      //console.log('dataArg:', dataArg)
      //const options = { method: 'PATCH', headers: myheaders, body: dataArg };
      const options = { method: 'POST', headers: myheaders, body: dataArg };
    return fetch(`${_host}${urlPrefix}${uri}`,options).then((response) => {
      if(response.ok) {
        alert("Firmware Flashed")
        return (response.json());
      }
      else {
          //return Promise.reject(text.detail || 'Error ' + response.status );
          alert("oops...You can't update this file")
         // return Promise.reject(response.statusText || 'Error ' + response.status );
      }
      })
  
    }

    export function patchItemURIEsc (uri, item) {
      // alert(uri);
      // alert(item);
      //return _post(`/rest/${item.category}`, item).then(refresh);
      return _patchItemURIEsc(uri, item);
    }
    
    function _patchItemURIEsc (uri, dataArg) {
     
      //const data = (typeof dataArg === 'object') ?
        //let data = JSON.stringify(dataArg);
        let myheaders = {
          ...headers,
          'X-API-Version': 200,
          //'Content-Type': 'multipart/form-data',
          'x-auth-token': window.localStorage.token
        };
        delete myheaders['Content-Type'];
        //console.log('dataArg:', dataArg)
        //const options = { method: 'PATCH', headers: myheaders, body: dataArg };
        const options = { method: 'PATCH', headers: myheaders, body: dataArg };
      return fetch(`${_host}${urlPrefix}${uri}`,options).then((response) => {
        if(response.ok) {
          return (response.json());
        }
        else {
            //return Promise.reject(text.detail || 'Error ' + response.status );
            alert("oops...You can't upload this file")
           // return Promise.reject(response.statusText || 'Error ' + response.status );
        }
        })
    
      }
  
  /* .then(function (res) {
    if (res.ok) {
      return Promise.resolve(res);
    } else if (res.status == 401) {
      alert("Oops! ");
    }
  }, function (e) {
    alert("Error submitting form!");
  });
} */







export function updateHeadersEsc (headers) {
  _headers = {..._headers, ...headers};
  Rest.setHeaders(headers);///
}
//need token and error text so duplicating post
export function postItemLoginEsc(uri, dataArg) {
  //console.log(dataArg);
  let myheaders = {
    ..._headers,
    "web-gui":"purple"
  };
  const data = (typeof dataArg === 'object') ?
  JSON.stringify(dataArg) : dataArg;
  const options = { method: 'POST', headers: myheaders, body: data };
 //console.log('fetch',_host, urlPrefix, uri, options);
  return fetch(`${_host}${urlPrefix}${uri}`, options).then((response) => {
    if(response.ok) {
      return Promise.resolve(response);
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        //console.log(response.status, response.statusText);
        return Promise.reject(response.statusText || 'Error ' + response.status );
    }
    })
}
export function putItem (item) {
  return _put(item.uri, item);
}

export function deleteItem (uri) {
  return _delete(uri);
}

// action creator
export function getDataFromUris(...uris) {
  const fetch = [];
  //console.log(uris.length);
  //return dispatch => {
    for(let i=0; i < uris.length; i++){
      fetch.push(_get(uris[i]));
      
    }
    return Promise.all(fetch)
  //}
} 

// Get data from URI
export function getDataFromUriArray(uris) {
 //console.log(uris);
  const fetch = [];
  //console.log("Utils getDataFromUriArray len = ",uris["length"]);
  //return dispatch => {
    for(let i=0; i < uris["length"]; i++){
      var  firmwareUri = uris[i]["@odata.id"];
      fetch.push(_get(`${firmwareUri}`));
 //console.log("Utils getDataFromUriArray Uri = ",`${firmwareUri}`);
    }
    return Promise.all(fetch)
  //}
} 


//DELETING MULTIPLE URIS
export function deleteuris(uriarray) {
  //console.log("uriarray",uriarray);
  //console.log("length = ",uriarray.length);
  const fetch = [];
    for(let i=0; i < uriarray.length; i++){
      var  uridel = uriarray[i];
      fetch.push(_deleteforsession(`${uridel}`));
    }
    return Promise.all(fetch)
} 


export function patchNetworkGeneral(uri, dataArg) {
  // const data = (typeof dataArg === 'object') ?
  // JSON.stringify(dataArg) : dataArg;
  let myheaders = {
    ...headers,
    'X-API-Version': 200,
    'Content-Type': "multipart/form-data",
    'x-auth-token': window.localStorage.token
  };
  const options = { method: 'PATCH', headers: myheaders, body: dataArg };
  //console.log(_host, urlPrefix, uri ,options, myheaders, headers, dataArg);
  //alert('before fetch');
  return fetch(`${_host}${urlPrefix}${uri}`, options).then((response) => {
    if(response.ok) {
      return Promise.resolve(response);
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        //console.log(response.status, response.statusText);
        return Promise.reject(response.statusText || 'Error ' + response.status );
    }
    })
}


export function patchBackupRestore(uri, dataArg){
  let myheaders = {
    ...headers,
    'X-API-Version': 200,
    'Content-Type': "multipart/form-data",
    'x-auth-token': window.localStorage.token
  };
  const options ={ method: 'PATCH', headers: myheaders, body: dataArg };
  return fetch(`${_host}${urlPrefix}${uri}`, options).then((response) => {
    if(response.ok) {
      return Promise.resolve(response);
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        //console.log(response.status, response.statusText);
        return Promise.reject(response.statusText || 'Error ' + response.status );
    }
    })
}


export function postFactoryConfig(uri, dataArg){
  let myheaders = {
    ...headers,
    'X-API-Version': 200,
    'Content-Type': "application/Json",
    'x-auth-token': window.localStorage.token
  };
  const options ={ method: 'POST', headers: myheaders, body: dataArg };
  //console.log('before fetch', dataArg);
  //console.log('header',headers, _host, urlPrefix, uri, options );
  return fetch(`${_host}${urlPrefix}${uri}`, options).then((response) => {
    if(response.ok) {//console.log('response.ok');
      return Promise.resolve(response);
      //console.log('factory2 ok');
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        //console.log(response.status, response.statusText);
        return Promise.reject(response.statusText || 'Error ' + response.status );
        //console.log('factory3 error');
    }
    })
}

export function postKill(uri, dataArg) {
  let myheaders = {
    ...headers,
    'X-API-Version': 200,
    'Content-Type': "application/Json",
    'x-auth-token': window.localStorage.token
  };
  const options ={ method: 'POST', headers: myheaders, body: dataArg };
  return fetch(`${_host}${urlPrefix}${uri}`, options).then((response) => {
    if(response.ok) {//console.log('response.ok');
      return Promise.resolve(response);
      //console.log('factory2 ok');
    }
    else {
        //return Promise.reject(text.detail || 'Error ' + response.status );
        //console.log(response.status, response.statusText);
        return Promise.reject(response.statusText || 'Error ' + response.status );
    }
    })
}

export function getSslCert (uri,) {
  //console.log("url=",urlPrefix);
  // alert(urlPrefix);
  // alert(uri);
  // alert(query);
  //console.log(_headers);
  //console.log('uri in _get =',_host,urlPrefix,uri,query)
  const options = { method: 'GET', headers: _headers };
  // prevent IE11 to cache resources by adding a timestamp to query params
  
  //vinod const query = buildQuery(params);
  const query ='';//vinod
  //console.log('header',headers, 'host', _host, urlPrefix, uri, 'options', options );
  //console.log(fetch(`${_host}${urlPrefix}${uri}${query}`, options));
  //console.log(fetch(`${_host}${urlPrefix}${uri}${query}`, options).then(processStatus));
  //console.log((fetch(`${_host}${urlPrefix}${uri}${query}`, options).then(processStatus).then(response => response.json())));
  return fetch(`${_host}${urlPrefix}${uri}${query}`, options)
  .then(processStatus)
  .then(response => response.json());
    
}

export function deleteTokenLogout(uri, token){

  let dataArg = {"x-auth-token": token};
  let myheaders = {
    ...headers,
    'X-API-Version': 200,
    'Content-Type': "application/Json",
    'x-auth-token': window.localStorage.token
  };
  const data = (typeof dataArg === 'object') ?
  JSON.stringify(dataArg) : dataArg;
  
  const options = { method: 'DELETE', headers: _headers, body: data };
  
  return fetch(`${_host}${urlPrefix}${uri}`, options)
  .then(processStatus)
  .then(response => response.json());
}