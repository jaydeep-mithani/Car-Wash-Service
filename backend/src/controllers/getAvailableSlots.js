const appoint = require('../schemas/appointment');
const slot = require('../schemas/slot');

const getAvailableSlots = async (req, res) => {
      let start = 0;
      const possibleSlots = [];
      const cars = Number(req.body.no);
      const allSlots = await slot.find({ hasBooking: false });
      allSlots.every((slot) => {
            if (Number(slot.startTime.split(':')[0]) >= Number(new Date().getHours())) {
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
      const inactiveSlots = allSlots.filter((slot) => slot.slotNo >= start && slot);

      inactiveSlots.forEach((slot, ind) => {
            let accessible = true;
            for (let i = 0; i < cars; i += 1) {
                  if (ind + i === inactiveSlots.length - 1) {
                        if (i + 1 !== cars) {
                              accessible = false;
                              break;
                        } else break;
                  } else if (
                        Number(inactiveSlots[ind + i].slotNo) + 1 !==
                        Number(inactiveSlots[ind + i + 1].slotNo)
                  ) {
                        accessible = false;
                        break;
                  }
            }
            if (accessible) possibleSlots.push(slot);
      });

      res.json({
            data: possibleSlots,
            status: 200,
            message: 'Possible slots for ' + cars + ' cars.',
      });
};

module.exports = getAvailableSlots;
