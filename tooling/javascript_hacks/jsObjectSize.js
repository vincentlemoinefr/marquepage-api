
function roughSizeOfObject(object) {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    switch (typeof value) {
      case 'boolean':
        bytes += 4;
        break;
      case 'string':
        bytes += value.length * 2;
        break;
      case 'number':
        bytes += 8;
        break;
      case 'object':
        if (!objectList.includes(value)) {
          objectList.push(value);
          for (const prop in value) {
            console.log(typeof value)
            if (value.hasOwnProperty(prop) !== void 0) {
              stack.push(value[prop]);
            }
          }
        }
        break;
    }
  }

  return bytes;
}


const roughObjSize = JSON.stringify(librairies).length;