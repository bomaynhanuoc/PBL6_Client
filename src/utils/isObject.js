function isObject(obj) {
  return obj && obj.constructor === Object && Object.keys(obj).length > 0;
}

export default isObject;
