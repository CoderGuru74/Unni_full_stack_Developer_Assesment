const express = require('express');
const {
  getAllRequests,
  getUserRequests,
  createRequest,
  updateRequestStatus,
} = require('../controllers/requestController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, adminAuth, getAllRequests);
router.get('/my-requests', auth, getUserRequests);
router.post('/', auth, createRequest);
router.put('/:id', auth, adminAuth, updateRequestStatus);

module.exports = router;
