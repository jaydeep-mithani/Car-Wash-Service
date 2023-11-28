const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
      {
            slotNo: Number,
            startTime: String,
            endTime: String,
            hasBooking: Boolean,
            userId: String,
      },
      {
            timestamps: true,
      }
);

module.exports = mongoose.model('slot', slotSchema);
