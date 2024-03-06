const express = require('express');
const router = express.Router();
const {getPermits,updatePermit,deletPermitApprove} = require('../controllers/approveController');
const {protect} = require('../middleware/authMiddleware');
const GetToApprove = require('../controllers/approve/read');
const AddApprove = require('../controllers/approve/update');
// psot and get method on have same adress
router.route('/').get(GetToApprove);

//delete user,get single user,updatePermit have same address (in simple way)
router.route('/:id').delete(protect,deletPermitApprove).post(AddApprove);
module.exports = router;