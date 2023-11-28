const slot = require('../schemas/slot');

const getMaxCars = async (req, res) => {
      let max = 0;
      let seq = 1;
      let start = 0;
      let entry = false;
      const allSlots = await slot.find({
            hasBooking: false,
      });

      allSlots.every((slot) => {
            if (Number(slot.startTime.split(':')[0]) >= Number(new Date().getHours())) {
                  entry = true;
                  if (
                        Number(slot.startTime.split(':')[0]) === Number(new Date().getHours()) &&
                        Number(slot.startTime.split(':')[1]) < Number(new Date().getMinutes())
                  )
                        return true;
                  else {
                        start = Number(slot.slotNo);
                        return false;
                  }
            }
            return true;
      });

      if (entry) {
            allSlots.forEach((slot, ind) => {
                  if (slot.slotNo >= start) {
                        if (ind !== allSlots.length - 1) {
                              if (Number(slot.slotNo) + 1 === Number(allSlots[ind + 1].slotNo))
                                    seq += 1;
                              else {
                                    if (seq > max) max = seq;
                                    seq = 1;
                              }
                        }
                        if (seq > max) max = seq;
                  }
            });
      }
      res.json({
            data: max,
            status: 200,
            message: 'Maximum cars.',
      });
};

module.exports = getMaxCars;
