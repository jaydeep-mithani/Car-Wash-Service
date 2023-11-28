const cron = require('node-cron');
const createSlots = require('../controllers/createSlots');

const job = () => {
      cron.schedule('0 0 * * *', () => {
            createSlots();
      });
      console.log('Cron job scheduled.');
};

module.exports = job;
