function listAllProperties(object) {
  var objectToInspect;     
  var result = [];

  for(
    objectToInspect = object;
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
  };
  return result;
};

console.log(listAllProperties(globalThis));