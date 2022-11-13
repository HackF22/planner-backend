const mongoose = require('mongoose');

const WildCardCourseSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: [true, "Please provide wildcard description"]
    },
    associated_courses: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "course"}] // The String is course_id of a course
    }
});

const WildCardCourse = mongoose.model("wildcardcourse", WildCardCourseSchema);

module.exports = WildCardCourse;
