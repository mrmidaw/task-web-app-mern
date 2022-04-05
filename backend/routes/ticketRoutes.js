const express = require('express');
const router = express.Router();
const { getTickets, createTicket, } = require('../controllers/ticketController');

const { protectAuth } = require('../middleware/authMiddleware');

router.route('/').get(protectAuth, getTickets).post(protectAuth, createTicket);


module.exports = router;