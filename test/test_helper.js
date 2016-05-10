import chai from 'chai';
import {jsdom} from 'jsdom';
import {create, VNode, VText} from 'virtual-dom';

const doc   = jsdom("<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>", {});

global.window    = doc.defaultView;
global.document  = doc;
global.Element   = doc.defaultView.Element;
global.expect    = chai.expect;
global.create    = create;

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

chai.use(function (chai) {
  chai.Assertion.addMethod('matchSerialized', function(serialized) {
    if (this._obj.containerId) {
      let containerId = this._obj.containerId;
      delete this._obj.containerId;
      chai.assert.match(containerId, /[a-z0-9]+/i);
    }

    if (this._obj.id) {
      let id = this._obj.id;
      delete this._obj.id;
      chai.assert.match(id, /[a-z0-9]+/i);
    }

    chai.assert.deepEqual(this._obj, serialized);
  });
});
