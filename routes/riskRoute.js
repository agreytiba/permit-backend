const express = require('express');
const router = express.Router();
const { getControlRisk,setControlRisk,getControlRisks,deleteControlRisk,updateControlRisk } = require('../controllers/RiskController');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').post(setControlRisk).get(getControlRisks);

//delete user,get single user,updateControlRisk have same address (in simple way)
router.route('/:id').delete(protect,deleteControlRisk).get(protect,getControlRisk).put(protect,updateControlRisk);

module.exports = router;