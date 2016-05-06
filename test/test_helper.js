var chai = require("chai");
var jsdom = require("jsdom").jsdom;
var doc = jsdom("<html><body></body></html>", {});

import {create} from 'virtual-dom';

global.window   = doc.defaultView;
global.document = doc;
global.Element  = global.window.Element;
global.expect   = chai.expect;

// Helper function
global.taggerGroupHtml = function(taggerGroup) {
  let div = document.createElement('div');
  taggerGroup.generateVTree().forEach((entry) => {
    div.appendChild(create(entry))
  });

  return div.innerHTML;
}

// Helper function
global.taggerHtml = function(tagger) {
  let div = document.createElement('div');
  tagger.process().forEach((entry) => {
    if (entry) div.appendChild(create(entry));
  });

  return div.innerHTML;
}

