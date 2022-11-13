const mongoose = require('mongoose');

const RequirementSchema = new mongoose.Schema({
    description: { //Name of major
        type: String,
        required: [true, "Please provide requirement description"]
    },
    //one will be empty
    courses: { //List of required courses 
        type: [[{type: mongoose.Schema.Types.ObjectId, ref: "course"}]], // The String is course_id of a course or wildcard course
        required: [true, "Please provide required classes"]
    },
    wildcardCourses: { //List of required wildcard courses 
        type: [[{type: mongoose.Schema.Types.ObjectId, ref: "wildcardcourse"}]], // The String is course_id of a course or wildcard course
        required: [true, "Please provide required classes"]
    },

});

const Requirement = mongoose.model("requirement", RequirementSchema);

module.exports = Requirement;
