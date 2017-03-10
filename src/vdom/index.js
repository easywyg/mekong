var create = require("./vdom/create-element.js")
var diff = require("./vtree/diff.js")
var patch = require("./vdom/patch.js")
var VNode = require('./vnode/vnode.js')
var VText = require('./vnode/vtext.js')

module.exports = {
    diff: diff,
    patch: patch,
    create: create,
    VNode: VNode,
    VText: VText
}
