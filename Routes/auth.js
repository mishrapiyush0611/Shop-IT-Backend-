const express=require('express')
const router=express.Router();
const {allUsers,
     registerUser,
     loginUser,
     logoutUser,
     getUserProfile,
     updateProfile,
     getUserDetails,
     updateUser,
     deleteUserDetails}=require('../Controllers/authControllers')
const {isAuthenticatedUser,
        authorizeRoles}=require('../middleWare/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUserDetails);


module.exports=router