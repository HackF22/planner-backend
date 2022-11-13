const express = require("express");
const router = express.Router();

const { getRecommendedCourses, 
        getAllCourses, 
        getPaginatedCourses, 
        getCourseData, 
        getPrereqs, 
        getNextCourse, 
        searchCourse } = require("../controllers/courseController");
const { getPrivateData } = require("../controllers/privateController");
const { protect } = require("../middleware/authMiddleware");
const { dummy } = require("../middleware/testingMiddleware");
const queryHelper = require('../utils/queryHelper');

router.route("/").get(protect, getPrivateData);

router.route("/all").get(protect, getAllCourses);

router.route("/page/:coursesPerPage/:pageNum").get(protect, getPaginatedCourses);

router.route("/getDetail/:courseId").get(protect, getCourseData);

router.route("/getPrereq/:courseId").get(protect, getPrereqs);

router.route("/getNextCourses/:courseId").get(protect, getNextCourse);

router.route("/searchCourse/:searchString").get(protect, searchCourse);

router.route("/recommendCourses/:numCourses").get(protect, getRecommendedCourses);

module.exports = router;