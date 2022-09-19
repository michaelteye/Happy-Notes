const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

const Story = require('../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

// @desc    Dashboard
// @route   GET /dashboard


module.exports = router
