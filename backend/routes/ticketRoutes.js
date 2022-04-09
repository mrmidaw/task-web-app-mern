const express = require('express');
const router = express.Router();
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket, } = require('../controllers/ticketController');

const { protectAuth } = require('../middleware/authMiddleware');

// Re-route into note router 
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protectAuth, getTickets).post(protectAuth, createTicket);
router.route('/:id').get(protectAuth, getTicket).delete(protectAuth, deleteTicket).put(protectAuth, updateTicket);

module.exports = router;