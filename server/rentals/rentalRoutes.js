const express = require('express');
const router = express.Router();
const rentalMethods = require('./rentalMethods');

router.post('/view', rentalMethods.viewSummary);
router.get('/get-borrow-options', rentalMethods.getStudentRentalOptions);
router.post('/borrow', rentalMethods.requestBorrow);
router.post('/set-borrow-status', rentalMethods.setBorrowStatus);

module.exports = router;





module.exports.setPool = function(pool) {
    rentalMethods.pool = pool;
};