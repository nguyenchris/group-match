const router = require('express').Router();
const userRoutes = require('./user');
const googleRoutes = require('./google');
const eventBriteRoutes = require('./eventBrite');

router.use('/user', userRoutes);
router.use('/google', googleRoutes);
router.use('/event', eventBriteRoutes);

module.exports = router;
