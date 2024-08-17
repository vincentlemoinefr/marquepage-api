

function test(const something, const somethingelse) {


  something = { ...something, ...somethingelse };
  return something;

}

const object = {
  age : 12
};

const object2 = {
  property : 'string'
};

console.log(test(object,object2));