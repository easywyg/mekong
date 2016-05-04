var chai = require("chai");
var jsdom = require("jsdom").jsdom;
var doc = jsdom("<html><body></body></html>", {});

global.window   = doc.defaultView;
global.document = doc;
global.Element  = global.window.Element;
global.expect   = chai.expect;
