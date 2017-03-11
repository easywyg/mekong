var version = require("./version")
var isVNode = require("./is-vnode")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(entry, properties, children, key, namespace) {
    if (typeof entry === 'string') {
        this.tagName = entry
    } else {
        this.tagName = entry.state.tag
        this.entity = entry
    }

    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0
        }
    }

    this.count = count + descendants
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"
