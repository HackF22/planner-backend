const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a full name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    major: { //Major
        type: String,
        required: [true, "Please provide a major"]
    },
    graduationYear: { // user's anticipated graduation year
        type: String,
        required: [true, "Please provide a graduation year"]
    },
    precollege: { //list of precollege things
        type: [String]
    },
    semesters: { // dic with key=sem-name val=courses
        type: Object
    }
});

const UserProfile = mongoose.model("userprofile", UserProfileSchema);

module.exports = UserProfile;