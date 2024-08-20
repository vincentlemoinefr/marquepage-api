function isCircular(obj) {
  let cache = new Set();
  function helper(obj) {
    let values = Object.values(obj);
    for (let i = 0; i < values.length; i++) {
      if (cache.has(values[i])) {
        return true;
      }
      // Skip non-reference types
      if (typeof values[i] !== 'object' || values[i] === null) continue;
      cache.add(values[i]);
      let flag = helper(values[i]);
      if (flag) return true;
    }
    return false;
  }
  return helper(obj);
}