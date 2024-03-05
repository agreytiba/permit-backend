const express = require('express');
const router = express.Router();
const {deletePermitReview} = require('../controllers/reviewControllers');
const {protect} = require('../middleware/authMiddleware');
const GetToReview = require('../controllers/reviewController/read');
const AddReview = require('../controllers/reviewController/update');
// psot and get method on have same adress
router.route('/').get(GetToReview);

//delete user,get single user,updatePermit have same address (in simple way)
router.route('/:id').delete(protect,deletePermitReview).put(AddReview);
module.exports = router;