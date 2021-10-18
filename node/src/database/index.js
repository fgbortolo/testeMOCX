const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testeMOCX');
mongoose.Promise = global.Promise;

module.exports = mongoose;

