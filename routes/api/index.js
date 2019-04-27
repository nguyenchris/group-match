const router = require('express').Router();
const userRoutes = require('./user');
const googleRoutes = require('./google');
const eventBriteRoutes = require('./eventBrite');
const weatherRoutes = require('./weather');

router.use('/user', userRoutes);
router.use('/google', googleRoutes);
router.use('/event', eventBriteRoutes);
router.use('/weather', weatherRoutes);

module.exports = router;
