const express = require('express');
const { register, login, getUserProfile, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
