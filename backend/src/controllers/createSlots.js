require('dotenv').config();
const slot = require('../schemas/slot');

const createSlots = async () => {
      let no = 1;
      const [startHour, endHour] = process.env.DURATION.split(',');
      let sd = new Date('2011-04-20T' + String(startHour).padStart(2, '0') + ':00:00.00');

      try {
            await slot.deleteMany();
            while (true) {
                  if (sd.getHours() >= endHour) break;
                  let ed = new Date(sd.getTime() + process.env.SLOTDURATION * 60000);
                  await slot.create({
                        slotNo: no,
                        startTime:
                              String(sd.getHours()).padStart(2, '0') +
                              ':' +
                              String(sd.getMinutes()).padStart(2, '0'),
                        endTime:
                              String(ed.getHours()).padStart(2, '0') +
                              ':' +
                              String(ed.getMinutes()).padStart(2, '0'),
                        hasBooking: false,
                        userId: null,
                  });
                  no += 1;
                  sd = new Date(ed.getTime() + process.env.SLOTINTERVAL * 60000);
            }
            return { status: 200, message: 'Slots created', total_slots_created: no - 1 };
      } catch (e) {
            return { error: 'Unexpected error occured!', message: e };
      }
};

module.exports = createSlots;
