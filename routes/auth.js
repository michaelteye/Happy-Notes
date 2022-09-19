const express = require('express')
const router = express.Router()
const passport = require('passport')

// @desc Login/Landing page
// @route GET /

router.get('/google', passport.authenticate('google', {scope: [ 'profile' ]}));

// @desc Login/Landing page
// @route GET /

// router.get('/dashboard', (req, res)=>{
//     res.render('Dashboard')
// })
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=> {
    res.redirect('/dashboard');
});

// @desc Logout user
// @route /auth/logout

router.post('/logout', (req, res, next)=>{
    req.logout((err)=>{
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router