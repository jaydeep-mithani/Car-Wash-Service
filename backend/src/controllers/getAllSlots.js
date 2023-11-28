const slot = require('../schemas/slot');

const getAllSlots = async (req, res) => {
      const all = await slot.find();
      res.json({ data: all, status: 200, message: 'All created slots' });
};

module.exports = getAllSlots;
