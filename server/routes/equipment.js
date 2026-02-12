const express = require('express');
const {
  getAllEquipment,
  getAvailableEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllEquipment);
router.get('/available', auth, getAvailableEquipment);
router.post('/', auth, adminAuth, createEquipment);
router.put('/:id', auth, adminAuth, updateEquipment);
router.delete('/:id', auth, adminAuth, deleteEquipment);

module.exports = router;
