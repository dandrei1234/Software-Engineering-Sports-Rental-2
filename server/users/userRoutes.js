const express = require('express');
const router = express.Router();
const userMethods = require('./userMethods');

// index.js handles '/api/users', so we only need the remaining part here
router.post('/login', userMethods.login);
router.post('/signup', userMethods.signUp);

module.exports = router;

module.exports.setPool = function(pool) {
    userMethods.pool = pool;
};