const express = require("express");
const router = express.Router();

const { getPrivateData } = require("../controllers/privateController");
const { createProfile, checkAddCourse, checkMoveCourse, checkRemoveCourse, addCourse, removeCourse, moveCourse, getProfileData } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const { dummy } = require("../middleware/testingMiddleware");

router.route("/getProfileData").get(protect, getProfileData);

router.route("/createProfileData").post(protect, createProfile);

router.route("/addCourse/:course_id/:semester").get(protect, addCourse);

router.route("/checkAddCourse/:course_id/:semester").get(protect, checkAddCourse);

router.route("/removeCourse/:course_id/:semester").get(protect, removeCourse);

//not thoroughly tested
router.route("/checkRemoveCourse/:course_id/:semester").get(protect, dummy, checkRemoveCourse);

router.route("/moveCourse/:course_id/:currsemester/:newsemester").get(protect, moveCourse);

router.route("/checkMoveCourse/:course_id/:newsemester").get(protect, checkMoveCourse);




module.exports = router;