
exports.getPrivateData = (req, res, next) => {
    return res.status(200).json({ success: true, message: "You got access to this route" })
}