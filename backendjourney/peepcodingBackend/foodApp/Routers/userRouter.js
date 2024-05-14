const express = require('express');
const userRouter = express.Router();
const { getUser, updateUser, deleteUser, getAllUser } 
=require('../controllers/userController');
const {signup,login,isAuthorised,protectRoute}
=require('../controllers/authController');

// User routes
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

// Profile page route with ProtectRoute middleware
userRouter
.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser);

userRouter
.route('forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)
// Admin-specific routes with isAuthorised middleware
userRouter
.use(isAuthorised(["admin"]));
userRouter
.route("/")
.get(getAllUser);

module.exports = userRouter;
