const express = require('express');
const createSlots = require('../controllers/createSlots');
const getAllSlots = require('../controllers/getAllSlots');
const getAvailableSlots = require('../controllers/getAvailableSlots');
const getMaxCars = require('../controllers/getMaxCars');

const router = express.Router();

router.get('/all', getAllSlots);
router.get('/maxCars', getMaxCars);
router.post('/', getAvailableSlots);
router.post('/create', async (req, res) => {
      res.json(await createSlots());
});

module.exports = router;
