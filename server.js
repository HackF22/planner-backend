require('dotenv').config({path: "./config.env"});
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require('cors')

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));

// TODO: Establish routes here
app.get("/", (req, res) => {
    res.send("Planner API");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/private", require("./routes/privateRoutes"));

app.use(errorHandler);

const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});