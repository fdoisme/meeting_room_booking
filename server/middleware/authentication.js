const { verifyToken } = require("../helpers")
const { User } = require("../models")
async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) throw ({ name: "unAuthentication" })
        const { id, email } = verifyToken(access_token)
        const user = await User.findOne({ where: { email: email, id: id } })
        if (!user) throw ({ name: "unAuthentication" })
        next({ id, email })
    } catch (error) {
        console.log("ERROR FROM AUTH :", error);
        next(error)
    }
}

module.exports = authentication