const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');

// Simply return the all the details of a Course
exports.getCourseData = async (req, res, next) => {
    const course_id = req.params.courseId;

    try {
        const results = await Course.findOne({course_id: course_id}).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        res.status(200).json({
            success: true,
            msg: "Got Course!",
            course: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

//TODO: createCourse | Priority: Low
// Simply create/add of Course to the course catalog, this is an admin exclusive function
exports.createCourse = async (req, res, next) => {

}

//TODO: updateCourse | Priority: Low
// Simply modify the details of an already existing Course, this is an admin exclusive function
exports.updateCourse = async (req, res, next) => {

}

//TODO: deleteCourse | Priority: Low
// Simply delete Course from the course catalog, this is an admin exclusive function
exports.deleteCourse = async (req, res, next) => {

}

// Simply get all Coursees from the database
exports.getAllCourses = async (req, res, next) => {
    try {
        const results = await Course.find().sort({}).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        res.status(200).json({
            success: true,
            msg: "Retrieved Courses!",
            courses: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve courses", 500));
    }
}

// Simply get all Coursees from the database in paginated fashion
exports.getPaginatedCourses = async (req, res, next) => {
    const pageNum = req.params.pageNum
    const coursesPerPage = req.params.coursesPerPage

    try {
        const results = await Course.find().sort({}).skip(pageNum*coursesPerPage).limit(coursesPerPage)
            .populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        res.status(200).json({
            success: true,
            msg: "Retrieved Courses!",
            profiles: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve courses", 500));
    }
}

//TODO: getFilteredCourses | Priority: Extremely Low
// Simply get all Coursees given filters from the database in paginated fashion
exports.getFilteredCourses = async (req, res, next) => {

}

//TODO: getRecommendedCoursees | Priority: High 
// Recommend n Coursees based on the highest level Coursees taken so far
exports.getRecommendedCourses = async (req, res, next) => {
    const numCourses = req.params.numCourses;

    try {
        const results = await Course.find().limit(numCourses).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        res.status(200).json({
            success: true,
            msg: "Got Courses!",
            course: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }

}

// Simply return the prerequisites of a Course 
exports.getPrereqs = async (req, res, next) => {
    const course_id = req.params.courseId;
    try {
        const course = await Course.findOne({course_id: course_id})
            .populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        let results;
        if (course == null) {
            results = []
        } else {
            results = course["prerequisite"]
        }
        res.status(200).json({
            success: true,
            msg: "Got Course!",
            prereqs: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

// Return list of Coursees that list a given Course as a prerequisite
exports.getNextCourse = async (req, res, next) => {
    const course_id = req.params.courseId;
    try {
        const courseObjId = await Course.findOne({course_id: course_id});
        const results = await Course.find({prerequisite: {$elemMatch:{$elemMatch:{$in:[courseObjId["_id"]]}}}}).limit(10).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        
        res.status(200).json({
            success: true,
            msg: "Got Course!",
            nextClasses: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

exports.searchCourse = async (req, res, next) => {
    const searchString = req.params.searchString;
    try {
        const searchResults = await Course.find({$or: [{name: {$regex: `.*${searchString}.*`, $options: 'i'}}, 
                                                       {description: {$regex: `.*${searchString}.*`, $options: 'i'}}, 
                                                       {course_id: {$regex: `.*${searchString}.*`, $options: 'i'}}]})
                                                       .populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        res.status(200).json({
            success: true,
            msg: "Got Course!",
            searchResults: searchResults
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Something went wrong searching for courses", 500));
    }
}