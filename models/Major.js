const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
    name: { //Name of major
        type: String,
        required: [true, "Please provide a major name"]
    },
    requirements: { //List of required courses 
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "requirement"}], // The String is course_id of a course or wildcard course
        required: [true, "Please provide requirements"]
    }
});

const Major = mongoose.model("major", MajorSchema);

module.exports = Major;
