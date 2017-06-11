var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function (response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // pass in the encoding 
  var coded = { encoding: 'utf8' };
  // use read file to access the file 
  // file is in archive path site assest + site name , pass encoding and call back error / data function
  fs.readFile(archive.paths.siteAssets + asset, encoding, function (error, data) {
    // if file is not present, it will throw an error
    if (error) {
      // if there is an error , check to see if file is present in archived sites 
      fs.readFile(archive.paths.archivedSites + assets, encoding, function (error, data) {
        // if file is not present, it will throw an error
        if (error) {
          // check to see if call back was passed 
          if (calllback) {
            //invoke call back
            callback();
          } else {
            // if no call back .. send error response
            exports.httpResponses.error(response);
          }
        } else {
          // if no error , send response
          exports.httpResponses.sendResponse(response, data);
        }
      });
    } else {
      // if no error send response
      exports.httpResponses.sendResponse(response, data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!


// add http responses 

exports.httpResponses = {
  // redirect reponse
  redirect: function (response, location, status) {
    // add response write head and response end 
    // redirect status code is 302
    // pass in re direct location. 
    // call response end
    status = status || 302;
    response.writeHead(status, { Location: location });
    response.end();
  },
  // standard response 
  sendResponse: function (status, obj, response) {
    // add response write head and response end 
    // add exports .headers 
    response.writeHead(status, exports.headers);
    // response end sends back and object
    response.end(obj);
  },
  // collect data from chunks 
  data: function (request, callback) {
    // add response write head and response end 
    var completeData = '';
  // request on data -- join chunks  
    request.on('data', function (chunk) {
      completeData += chunk;
    });
    request.on('end', function () {
      callback(completeData);
    });
  },
  // send resource not found error 
  error: function (response) {
    // add response write head and response end 
    response.writeHead(404, exports.headers);
    // error 404 response
    response.end('Error 404! Page not found');
  }
};