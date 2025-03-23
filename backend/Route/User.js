const express = require('express');
const router = express.Router();
const { getProfileData, updateProfileData, loginUser, logoutUser } = require('../Controller/profileController');


router.route('/profile').get(getProfileData).put(updateProfileData);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;