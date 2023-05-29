
const express = require('express');
const router  = express.Router();
const {login, register, getProfile, logout } = require('../controllers/user')



router.post('/register', register);

router.post('/login', login);

router.get('/profile', getProfile);

router.post('/logout', logout);


module.exports = router;