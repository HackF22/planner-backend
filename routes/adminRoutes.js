const express = require("express");
const router = express.Router();

const { getPrivateData, isAdmin } = require("../controllers/privateController");
const { protect } = require("../middleware/authMiddleware");
const { dummy } = require("../middleware/testingMiddleware");

router.route("/").get(protect, getPrivateData);

// router.route("/profiles").get(protect, dummy, isAdmin, getProfileData)
//                     .post(protect, dummy, isAdmin, createProfile)
//                     .patch(protect, dummy, isAdmin, updateProfile)
//                     .delete(protect, dummy, isAdmin, deleteProfile);

// router.route("/users").get(protect, dummy, isAdmin, getUserData)
//                     .post(protect, dummy, isAdmin, createUser)
//                     .patch(protect, dummy, isAdmin, updateUser)
//                     .delete(protect, dummy, isAdmin, deleteUser);


// router.route("/classes").get(protect, dummy, isAdmin, getClassData)
//                     .post(protect, dummy, isAdmin, createClass)
//                     .patch(protect, dummy, isAdmin, updateClass)
//                     .delete(protect, dummy, isAdmin, deleteClass);

// router.route

module.exports = router;
