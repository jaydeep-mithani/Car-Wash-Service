require('dotenv').config();
global.mongoose = require('mongoose');

mongoose
      .connect(process.env.CONNECTIONSTRING)
      .then(() => {
            console.log('Database connection successful...');
      })
      .catch((err) => console.log('Database connection failure!', err));

module.exports.mongoose = mongoose;
