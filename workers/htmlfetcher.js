// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.


// add archive helper functions to worker 
var archive = require('../helpers/archive-helpers');
// read the listof urls and download Urls 
archive.readListOfUrls(archive.downloadUrls);