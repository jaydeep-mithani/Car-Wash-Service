const appoint = require('../schemas/appointment');
const slot = require('../schemas/slot');

const appointSlots = async (fname, phone, mail, tcars, slt) => {
      const bookedSlots = [];
      const book = await appoint.create({
            name: fname,
            contact: phone,
            email: mail,
            cars: tcars,
            slotNo: slt,
      });
      for (let i = 0; i < tcars; i += 1) {
            bookedSlots.push(slt + i);
      }
      await slot.updateMany(
            { slotNo: { $in: bookedSlots } },
            { hasBooking: true, userId: book._id }
      );

      return true;
};

module.exports = appointSlots;
