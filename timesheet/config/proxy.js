/*global module, require, logger*/
/*jslint nomen: false*/

module.exports = function (req, res, next) {
  "use strict";

  var httpProxy = require('http-proxy'),
  url = require('url'),
  proxy = new httpProxy.RoutingProxy(),
  properties = require('./properties');

  Object.keys(properties.proxy).forEach( function (key) {

    var proxied = new RegExp(key);

    if (req.url.match(proxied)) {

      console.log('Setting up proxy path "' + key + '"');
      var urlType = properties.proxy[key].urlType;
      if (urlType) {
        if (urlType === 'query') {
          req.url = decodeURIComponent(req.url.substr(req.url.indexOf("?") + 1));
        }
        else if (urlType === 'replace') {
          req.url = properties.proxy[key].path;
        }
        //Proxy pass method: If the URL matches the path specified, replace the hostname and port (path remains the same)
        else if (urlType === 'pass') {
          req.url = [properties.proxy[key].protocol, "://",
          properties.proxy[key].host, ":",
          properties.proxy[key].port, req.url].join('');
        }
        else {
          console.log('*** Proxy declared without URL type.\nOptions:\n\tquery - retrieves from a query' +
            'string\n\treplace - replaces the URL with the specified URL');
        }
      }

      var urlObj = url.parse(req.url);

      console.log('Proxying Request "' + urlObj.path + '"');

      proxy.proxyRequest(req, res, {
        host: urlObj.hostname,
        port: urlObj.port || 80
      });
    }
    else {
      next();
    }
  });
};