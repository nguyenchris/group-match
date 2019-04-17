const router = require('express').Router();
const userRoutes = require('./user');
const googleRoutes = require('./google');

router.use('/user', userRoutes);
router.use('/google', googleRoutes);

module.exports = router;
