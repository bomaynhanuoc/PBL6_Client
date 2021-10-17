function isObject(obj) {
  return obj.constructor === Object && Object.keys(obj).length > 0;
}

export default isObject;
