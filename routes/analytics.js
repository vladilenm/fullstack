const express = require('express')
const controller = require('../controllers/analytics')
const passport = require('passport')
const router = express.Router()

router.get('/overview', passport.authenticate('jwt', {session: false}), controller.getOverview)
router.get('/analytics', passport.authenticate('jwt', {session: false}), controller.getAnalytics)

module.exports = router