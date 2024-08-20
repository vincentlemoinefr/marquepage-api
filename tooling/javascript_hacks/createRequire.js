
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const json = require('../package.json');
console.log(json);