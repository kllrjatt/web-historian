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
    var status = _.some(sites, function (site, i) {
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
};

exports.downloadUrls = function (urls) {
};
