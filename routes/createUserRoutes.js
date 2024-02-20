const express = require('express');
const router = express.Router();
const { createUser,deleteUser} = require('../controllers/createUserController');
const {protectAdmin} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').post(protectAdmin,createUser)
//delete user,get single user,updateUser have same address (in simple way)
router.route('/:id').delete(protectAdmin,deleteUser)

module.exports = router