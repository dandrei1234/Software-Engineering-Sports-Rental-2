const express = require('express');
const router = express.Router();
const rentalMethods = require('./rentalMethods');

router.get('/view', rentalMethods.viewSummary);
router.get('/get-borrow-options', rentalMethods.getStudentRentalOptions);
router.post('/borrow', rentalMethods.requestBorrow);

module.exports = router;





module.exports.setPool = function(pool) {
    rentalMethods.pool = pool;
};