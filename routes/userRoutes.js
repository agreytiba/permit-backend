const express = require('express');
const router = express.Router();
const { getMe, loginUser, registerUser,getUsers,deleteUser,updateUser } = require('../controllers/userControllers');

// psot and get method on have same adress
router.route('/').post(registerUser).get(getUsers);
// route for login user (in simple way)
router.route('/login').post(loginUser);

//delete user,get single user,updateUser have same address (in simple way)
router.route('/:id').delete(deleteUser).get(getMe).put(updateUser);
;

module.exports = router;
