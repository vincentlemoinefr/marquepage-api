import fs from 'fs';

const files = fs.readdirSync('./src/controllers/');
const constrollers = {};

for (const file of files) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const name = file.replace('.js', '');
    const constroller = await import('./' + file);
    constrollers[name] = constroller.default;
  }
};



export default constrollers;

