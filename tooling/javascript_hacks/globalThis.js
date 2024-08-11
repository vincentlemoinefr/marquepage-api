function getIterableClasses() {
  let classNames = [];
  let builtIn = Object.getOwnPropertyNames(globalThis);
  for (let x of builtIn) { 
    try {
      let object = globalThis[x].prototype;
      object[Symbol.iterator] && classNames.push(x);
    }
    catch (e) { }
  }
  return classNames.sort();
}

let c = getIterableClasses();
console.log('Found ' + c.length + ' iterable classes');
console.log(c.join('\n'));

console.log(globalThis);