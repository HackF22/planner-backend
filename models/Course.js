const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course_id: { // This is the name of the course
        type: String,
        required: [true, "Please provide a class id!"]
    },
    name: { // This is the name of the course 
        type: String,
    },
    credits: { // This is the number of credits the course is worth
        type: Number,
        required: [true, "Please provide number of credits!"]
    },
    semesters: {
        type: String, // This is semester the course is offered in
    },
    past_instructors: {
        type: [String], //This is list of past professors of the course
    },
    description: {
        type: String // This is description of a course
    },
    prerequisite: {
        type: [[{type: mongoose.Schema.Types.ObjectId, ref: "course"}]] // The String is course_id of a course
    }
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;
