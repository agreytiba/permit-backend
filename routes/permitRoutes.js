const express = require('express');
const router = express.Router();
const { getPermit,setPermit,getPermits,deletePermit,updatePermit } = require('../controllers/permitControllers');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').post(setPermit).get(getPermits);

//delete user,get single user,updatePermit have same address (in simple way)
router.route('/:id').delete(protect,deletePermit).get(protect,getPermit).put(protect,updatePermit);

module.exports = router;