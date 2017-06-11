var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

// use url to parse url 
var url = require('url');
// add http helpers 
var helper = require('./http-helpers');

// get or post methods 
var requestAction = {
  GET: function (request, response) {
    // parse the url path and get pathname
    var urlPath = url.parse(request.url).pathname;
    // check to see what path is 
    if (urlPath === '/') {
      // replace path if no name 
      urlPath = '/index.html';
    }
  },
  POST: ''
};

exports.handleRequest = function (request, response) {
  // check to see type of request 
  var handleRequest = requestAction[request.method];
  // there is a request 
  if (handleRequest) {
    //process a handle request 
    handleRequest(request, response);
  } else {
    // throw error
    helper.httpResponses.error(response);
  }
};
