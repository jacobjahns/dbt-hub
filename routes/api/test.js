const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Models

// Routes
// @route   GET /api/test
// @desc    Testing app & api connection
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello App!' });
});

module.exports = router;
