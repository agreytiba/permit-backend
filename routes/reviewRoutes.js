const express = require('express');
const router = express.Router();
const {getPermits,updatePermit,deletePermitReview} = require('../controllers/reviewControllers');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').get(getPermits);

//delete user,get single user,updatePermit have same address (in simple way)
router.route('/:id').delete(protect,deletePermitReview).put(protect,updatePermit);
module.exports = router;