const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
      {
            name: String,
            contact: Number,
            email: String,
            cars: Number,
            slotNo: Number,
      },
      {
            timestamps: true,
      }
);

module.exports = mongoose.model('appointment', appointmentSchema);
