import chai from 'chai';
import {jsdom} from 'jsdom';
import {create, VNode, VText} from 'virtual-dom';

const doc   = jsdom("<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>", {});

global.window   = doc.defaultView;
global.document = doc;
global.Element  = doc.defaultView.Element;
global.expect   = chai.expect;
global.create   = create;

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
