exports.readOpenapi = require("./readOpenapi.js");
exports.doSomething = require("./doSomething.js");
exports.readBinder = require("./readBinder.js");

// Maybe
// require('fs').readdirSync(__dirname + '/').forEach(function(file) {
// if (file.match(/\.js$/) !== null && file !== 'index.js') {
// var name = file.replace('.js', '');
// exports[name] = require('./' + file);
// }
// });