class Func {}

Func.prototype.isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

export default new Func();
