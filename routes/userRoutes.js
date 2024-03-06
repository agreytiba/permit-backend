const express = require('express');
const router = express.Router();
const { getMe, loginUser, registerUser,getUsers,deleteUser,updateUser } = require('../controllers/userControllers');
const {protect} = require('../middleware/authMiddleware')
// psot and get method on have same adress
router.route('/').get( getUsers).post(registerUser);
// route for login user (in simple way)
router.route('/login').post(loginUser);

//delete user,get single user,updateUser have same address (in simple way)
router.route('/:id').delete(protect,deleteUser).get(protect,getMe).put(protect,updateUser);
;

module.exports = router;
