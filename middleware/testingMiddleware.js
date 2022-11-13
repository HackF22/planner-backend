exports.test = async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "Hello World!",
    });
}

exports.dummy = async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "This is a dummy response, API route's intented functionality not finished."
    })
}