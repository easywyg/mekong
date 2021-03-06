import chai from 'chai';
import {jsdom} from 'jsdom';
import {create, VNode, VText} from '../src/vdom/index.js';

const doc = jsdom("<!doctype html><html><head><meta charset='utf-8'></head><body><div id='container'></div></body></html>", {});

global.window       = doc.defaultView;
global.document     = doc;
global.Element      = doc.defaultView.Element;
global.expect       = chai.expect;
global.container    = global.document.getElementById('container')
global.content      = function() { return global.container.innerHTML;  }
global.create       = create;
global.VText        = VText;
global.VNode        = VNode;

import Mekong from '../src/api.js';
global.mekong = new Mekong(global.container);
global.mekong.use('Paragraph');
global.mekong.use('Table');
global.mekong.use('List');
global.mekong.use('Grid');
global.mekong.use('Heading');
global.mekong.use('Preformatted');
global.clearContent = function() {
  global.container.innerHTML = '';
  //global.mekong.document.removeAll();
}

global.clearContentWithEntities = function() {
  global.container.innerHTML = '';
  mekong.document.state.entities = [];
  //global.mekong.document.removeAll();
}

// Helper function
global.builderHtml = (builder) => {
  let div = document.createElement('div');
  let el = create(builder.generate(), { document: document });

  div.appendChild(el);
  return div.innerHTML;
}

// Helper function
global.vdomBuilderHtml = (vdomBuilder) => {
  let div = document.createElement('div');
  vdomBuilder.process().forEach((entry) => {
    div.appendChild(create(entry, { document: document }));
  });

  return div.innerHTML;
}
