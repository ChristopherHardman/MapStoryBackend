const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = (dbName) => {
  mongoose.connect(`mongodb://localhost/${dbName}`, {useMongoClient: true});

  mongoose.connection.on('connected', () => {
    //eslint-disable-next-line
    console.log('Mongoose connected');
  });
};
