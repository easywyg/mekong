Element.prototype.appendBefore = function(element) {
  return element.parentNode.insertBefore(this, element);
}, false;

Element.prototype.appendAfter = function(element) {
  return element.parentNode.insertBefore(this, element.nextSibling);
}, false;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

if (typeof window != 'undefined') {
  window.l = (...args) => {
    console.log(...args)
  }
}

if (!String.isString) {
  String.isString = (arg) => {
    return Object.prototype.toString.call(arg) === '[object String]';
  };
}
