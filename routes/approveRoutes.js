const express = require('express');
const router = express.Router();
const {getPermits,updatePermit,deletPermitApprove} = require('../controllers/approveController');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').get(getPermits);

//delete user,get single user,updatePermit have same address (in simple way)
router.route('/:id').delete(protect,deletPermitApprove).put(protect,updatePermit);
module.exports = router;