const path = require('path');
const apiRoutes = require('./api');
const router = require('express').Router();


// API Routes
router.use('/api', apiRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
