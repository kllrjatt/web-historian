var fs = require('fs');
var path = require('path');
var _ = require('underscore');
// add request 
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function (pathsObj) {
  _.each(pathsObj, function (path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function (callback) {
  // read the files in the path list 
  fs.readFile(exports.paths.list, function (error, sites) {
    // split information at new line to get unique paths 
    sites = sites.toString().split('\n');
    // pass each site via the call back 
    if (callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = function (url, callback) {
  //read all urls in storage 
  exports.readListOfUrls(function (sites) {
    // check to see if the passed URL is present in the sites 
    // if it is present  run the call back on it.
    var status = _.some(sites, function (site) {
      return site.match(url);
    });
    callback(status);
  });
};

exports.addUrlToList = function (url, callback) {
  // append the file 
  // add url to it along with new line to split it in list 
  fs.appendFile(exports.paths.list, url + '\n', function (error, file) {
    // call done -- invoked call back  
    callback();
  });
};

exports.isUrlArchived = function (url, callback) {
  // get path to archived files 
  var archivePath = path.join(exports.paths.archivedSites, url);
  // check if url is archived 
  fs.access(archivePath, function (hasSite) {
    // call back result ... if no error , hasSiteis present 
    // run call back on not has site 
    callback(!hasSite);
  });

};

exports.downloadUrls = function (urls) {
  // iterate throught all the urls 
  for (var i = 0; i < urls.length; i++) {
    // check if url is present 
    if (urls[i]) {
      // request url with http pre fix and pipe it to local file 
      // use pipe and create write stream to ge tthis done 
      // each website needs its own location to be saved within archived sites
      request('http://' + urls[i]).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + urls[i]));
    }
  }
};
