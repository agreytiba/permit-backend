const express = require('express');
const router = express.Router();
const { deletePermit,updatePermit,updatePermitReview } = require('../controllers/permitControllers');
const setPermit = require('../controllers/permitRequest/createpermit');
const getPermits = require('../controllers/permitRequest/read');
const {protect} = require('../middleware/authMiddleware');
const ReadOne = require('../controllers/permitRequest/ReadOne');
const DeletePermit = require('../controllers/permitRequest/deletePermit');
// psot and get method on have same adress
router.route('/').post(setPermit).get(getPermits);

//delete user,get single user,updatePermit have same address (in simple way)
router.route('/:id').delete(DeletePermit).get(ReadOne).put(protect,updatePermit);
module.exports = router;