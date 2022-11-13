const ErrorResponse = require('../utils/errorResponse');
const UserProfile = require('../models/UserProfile');
const Course = require('../models/Course');
const validator = require('../utils/validation');

//TODO: getProfileData | Priority: High
// Simply return all user profile data
exports.getProfileData = async (req, res, next) => {
    const email = req.user.email;
    
    try {
        const user_profile = await UserProfile.findOne({email: email});
        res.status(200).json({
            success: true,
            msg: "Recieved profile info!",
            userHasProfile: true,
            userProfile: user_profile
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to create Account Profile", 500));
    } 
}

// Create user's profile
exports.createProfile = async (req, res, next) => {
    const userEmail = req.user.email;
    const username = req.user.username;
    let userProfileToBeCreated = req.body;
    userProfileToBeCreated["name"] = username;
    userProfileToBeCreated["email"] = userEmail;
    try {
        await UserProfile.create(userProfileToBeCreated)
        res.status(200).json({
            success: true,
            msg: "Created account profile information!",
            userHasProfile: true,
            userProfile: userProfileToBeCreated
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to create Account Profile", 500));
    } 
}

exports.checkAddCourse = async (req, res, next) => {
    const semester = req.params.semester;
    const course_id = req.params.course_id;
    const email = req.user.email;
    try {
        const course = await Course.findOne({course_id: course_id})
            .populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        const user_profile = await UserProfile.findOne({email: email});
        let semesters;
        let prerequisites;
        let result;
        if (course == null || user_profile == null) {
            result = false;
            res.status(200).json({
                success: false,
                msg: "Didn't find course, or user profile!",
                isValid: result
            });
        } else {
            prerequisites = course["prerequisite"]
            semesters = user_profile["semesters"]
            result = validator.checkAddHelper(prerequisites, semesters, semester)
        }
        res.status(200).json({
            success: true,
            msg: "Got Course Prerequisites!",
            prereqs: prerequisites,
            profile_semesters: semesters,
            semester: semester,
            isValid: result
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

exports.checkRemoveCourse = async (req, res, next) => {
    const semester = req.params.semester;
    const course_id = req.params.course_id;
    const email = req.user.email;
    try {
        const user_profile = await UserProfile.findOne({email: email});
        let semesters;
        let result;
        if (user_profile == null) {
            result = false;
            res.status(200).json({
                success: false,
                msg: "Didn't find course, or user profile!",
                isValid: result
            });
        } else {
            semesters = user_profile["semesters"]
            result = await validator.checkRemoveHelper(semesters, semester, course_id)
        }
        res.status(200).json({
            success: true,
            msg: "Got Course Prerequisites!",
            profile_semesters: semesters,
            semester: semester,
            isValid: result
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

exports.checkMoveCourse = async (req, res, next) => {
    const newsemester = req.params.newsemester;
    const course_id = req.params.course_id;
    const email = req.user.email;
    let prereqArr = []
    let postreqArr = []
    //get prereq courses 

    //get postreq courses 
    try {
        const user_profile = await UserProfile.findOne({email: email});
        let semesters = user_profile["semesters"]
        const course = await Course.findOne({course_id: course_id}).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        let prereqs = course["prerequisite"];
        const postreqs = await Course.find({prerequisite: {$elemMatch:{$elemMatch:{$in:[course["_id"]]}}}}).limit(10).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
        prereqs.forEach(subArr=>subArr.forEach(course=>prereqArr.push(course["course_id"])));
        postreqs.forEach(course=>postreqArr.push(course["course_id"]));
        let newchosensemcourses = semesters[newsemester]
        const intersection1 = newchosensemcourses.filter(val=>prereqArr.includes(val));
        const intersection2 = newchosensemcourses.filter(val=>postreqArr.includes(val));
        res.status(200).json({
            success: true,
            msg: "Got Course Prerequisites!",
            prereqs: prereqArr,
            postreqs: postreqArr,
            semesters: semesters,
            newsemester: newsemester,
            newchosensemcourses: semesters[newsemester],
            isValid: intersection1.length + intersection2.length === 0
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

exports.addCourse = async (req, res, next) => {
    const semester = req.params.semester;
    const course_id = req.params.course_id;
    const email = req.user.email;
    try {
        const user_profile = await UserProfile.findOne({email: email});
        let semesters = user_profile["semesters"]
        semesters[semester].push(course_id)
        await UserProfile.updateOne({ email: email }, {
            semesters: semesters
        });
        res.status(200).json({
            success: true,
            msg: "Add course to schedule!"
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

exports.removeCourse = async (req, res, next) => {
    const semester = req.params.semester;
    const course_id = req.params.course_id;
    const email = req.user.email;
    try {
        const user_profile = await UserProfile.findOne({email: email});
        let semesters = user_profile["semesters"]
        semesters[semester] = semesters[semester].filter(val=>val!==course_id);
        await UserProfile.updateOne({ email: email }, {
            semesters: semesters
        });
        res.status(200).json({
            success: true,
            msg: "Removed course to schedule!",
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}

exports.moveCourse = async (req, res, next) => {
    const currsemester = req.params.currsemester;
    const newsemester = req.params.newsemester;
    const course_id = req.params.course_id;
    const email = req.user.email;
    try {
        const user_profile = await UserProfile.findOne({email: email});
        let semesters = user_profile["semesters"]
        semesters[currsemester] = semesters[currsemester].filter(val=>val!==course_id);
        await UserProfile.updateOne({ email: email }, {
            semesters: semesters
        });
        semesters[newsemester].push(course_id)
        await UserProfile.updateOne({ email: email }, {
            semesters: semesters
        });
        res.status(200).json({
            success: true,
            msg: "Moved course within schedule!",
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve course", 500));
    }
}



//TODO: updateProfile | Priority: High
// Update information in the user's profile
exports.updateProfile = async (req, res, next) => {

}

//TODO: deleteProfile | Priority: Low
// Delete user's profile information, this is an admin exclusive function 
exports.deleteProfile = async (req, res, next) => {

}
