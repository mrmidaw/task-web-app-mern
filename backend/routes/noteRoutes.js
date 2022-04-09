const express = require('express');
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require('../controllers/noteController');

const { protectAuth } = require('../middleware/authMiddleware');

router.route('/').get(protectAuth, getNotes).post(protectAuth, addNote);

module.exports = router;