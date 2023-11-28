require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const slots = require('./src/routes/slots');
const job = require('./src/cron-job/recreateSlots');
const bodyStyles = require('./src/utilities/bodyStyles');
const services = require('./src/utilities/services');
const sendEmail = require('./src/controllers/sendEmail');

require('./src/DB/connection');

const app = express();

app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
});
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/slots', slots);
app.get('/cars', (req, res) => {
      res.json({ data: bodyStyles, status: 200, message: 'Car body types' });
});
app.get('/services', (req, res) => {
      res.json({ data: services, status: 200, message: 'Offered services' });
});
app.post('/email', sendEmail);

job();

app.listen(process.env.PORT, () => {
      console.log('Now serving...');
});
