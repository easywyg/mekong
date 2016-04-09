Element.prototype.appendBefore = function(element) {
  return element.parentNode.insertBefore(this, element);
}, false;

Element.prototype.appendAfter = function(element) {
  return element.parentNode.insertBefore(this, element.nextSibling);
}, false;

Object.defineProperty(Object.prototype, "merge", {
  enumerable: false,
  value: function(from) {
    var props = Object.getOwnPropertyNames(from);
    var dest = this;

    props.forEach(function(name) {
      if (name in dest) {
        var destination = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(dest, name, destination);
      }
    });
    return this;
  }
});

Object.defineProperty(Object.prototype, "clone", {
  enumerable: false,
  value: function() {
    return this.merge({})
  }
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
