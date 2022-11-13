// Simple endpoint to convey authorization worked 
exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
        user: req.user
    });
};

// Simple endpoint to either block or allow a user to go further depending on their admin status
exports.isAdmin = (req, res, next) => {
    const admin = req.user.isAdmin;
    if (!admin) {
        res.status(500).json({
            success: false,
            data: "Forbidden! User is not an admin.",
        });
    } else {
        next();
    }
}