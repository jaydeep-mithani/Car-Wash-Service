require('dotenv').config();
const nodemailer = require('nodemailer');
const appointSlots = require('../controllers/appointSlots');
const moment = require('moment');
const mailUserTemplate = require('../utilities/mailUserTemplate');
const mailAdminTemplate = require('../utilities/mailAdminTemplate');

const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
            user: process.env.HOST,
            pass: process.env.HOSTPASS,
      },
});

const sendEmail = (req, res) => {
      const date = new Date();
      const type = JSON.parse(req.body.bodystyle);
      const service = JSON.parse(req.body.service);
      const cn = JSON.parse(req.body.carname);
      const cm = JSON.parse(req.body.carmodel);
      const cy = JSON.parse(req.body.caryear);
      const typeAll = [];
      const serviceAll = [];
      const carNames = [];
      const carModels = [];
      const carYears = [];

      for (i in type) typeAll.push(type[i]);
      for (i in service) serviceAll.push(service[i]);
      for (i in cn) carNames.push(cn[i]);
      for (i in cm) carModels.push(cm[i]);
      for (i in cy) carYears.push(cy[i]);

      const adminMailOptions = {
            from: `${process.env.HOST}`,
            to: `${String(process.env.HOST)}`,
            subject: 'A Car Wash Order Rejistered',
            text: '',
            html: mailAdminTemplate(
                  String(req.body.uname)
                        .split(' ')
                        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                        .join(' '),
                  String(req.body.reciever),
                  String(req.body.phone),
                  String(req.body.total),
                  cn.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  cm.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  cy.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  type.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  String(moment(req.body.sTime, 'HH:mm').format('hh:mm A')),
                  service.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  req.body.outlet ? 'Yes' : 'No',
                  String(
                        (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
                              '/' +
                              (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
                              '/' +
                              date.getFullYear()
                  )
            ),
      };
      const userMailOptions = {
            from: `${process.env.HOST}`,
            to: `${req.body.reciever}`,
            subject: 'Your Car Wash Order',
            text: '',
            html: mailUserTemplate(
                  String(req.body.uname)
                        .split(' ')
                        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                        .join(' '),
                  String(req.body.reciever),
                  String(req.body.phone),
                  String(req.body.total),
                  cn.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  cm.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  cy.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  type.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  String(moment(req.body.sTime, 'HH:mm').format('hh:mm A')),
                  service.map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1)).join(', '),
                  req.body.outlet ? 'Yes' : 'No',
                  String(
                        (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
                              '/' +
                              (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
                              '/' +
                              date.getFullYear()
                  )
            ),
      };

      transporter.sendMail(userMailOptions, async (error, info) => {
            if (error) {
                  res.json({
                        data: error,
                        status: 404,
                        message: 'Oops, something went wrong!',
                  });
            } else {
                  const insert = await appointSlots(
                        req.body.uname,
                        req.body.phone,
                        req.body.reciever,
                        Number(req.body.total),
                        Number(req.body.sNo)
                  );
                  if (!insert) {
                        res.json({
                              data: 'error',
                              status: 404,
                              message: 'Oops, something went wrong on our end!',
                        });
                  }
            }
      });
      transporter.sendMail(adminMailOptions, async (error, info) => {
            if (error) {
                  res.json({
                        data: error,
                        status: 404,
                        message: 'Oops, something went wrong!',
                  });
            } else {
                  res.json({
                        data: 'sent',
                        status: 200,
                        message: 'email sent successfully',
                  });
            }
      });
};

module.exports = sendEmail;
