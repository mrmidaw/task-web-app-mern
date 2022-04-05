const express = require('express');
const router = express.Router();
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket, } = require('../controllers/ticketController');

const { protectAuth } = require('../middleware/authMiddleware');

router.route('/').get(protectAuth, getTickets).post(protectAuth, createTicket);
router.route('/:id').get(protectAuth, getTicket).delete(protectAuth, deleteTicket).put(protectAuth, updateTicket);

module.exports = router;