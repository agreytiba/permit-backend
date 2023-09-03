const express = require('express');
const router = express.Router();
const { getSafety,setSafety,getSafetys,deleteSafety,updateSafety } = require('../controllers/safetyController');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').post(protect,setSafety).get(protect,getSafetys);

//delete user,get single user,updateSafety have same address (in simple way)
router.route('/:id').delete(protect,deleteSafety).get(protect,getSafety).put(protect,updateSafety);

module.exports = router;
