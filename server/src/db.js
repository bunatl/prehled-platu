const db = require('monk')('localhost:27017/salaries-cz');

// module.exports.db = db;
module.exports = db;