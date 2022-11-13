const express = require("express");
const router = express.Router();

const { getPrivateData } = require("../controllers/privateController");
const { protect } = require("../middleware/authMiddleware");
const { dummy } = require("../middleware/testingMiddleware");

// dummy endpoint
router.route("/").get(protect, getPrivateData);

// TODO: implement profile endpoints | Priority: High
// router.route("/profile").get(protect, dummy)
//                         .post(protect, dummy)
//                         .patch(protect, dummy);

router.use("/profiles", require("./profileRoutes"));

// TODO: implement courses endpoints | Priority: High
router.use("/courses", require("./courseRoutes"));

router.use("/admin", require("./adminRoutes"));



module.exports = router;