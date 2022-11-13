const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!")
}

module.exports = connectDB;