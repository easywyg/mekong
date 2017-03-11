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
