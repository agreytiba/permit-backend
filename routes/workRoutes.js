const express = require('express');
const router = express.Router();
const { getWork,setWork,getWorks,DeleteWork,updateWork } = require('../controllers/workController');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').post(protect,setWork).get(protect,getWorks);

//delete user,get single user,updateWork have same address (in simple way)
router.route('/:id').delete(protect,DeleteWork).get(protect,getWork).put(protect,updateWork);

module.exports = router;
