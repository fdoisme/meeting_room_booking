function authorization(auth, req, res, next) {
    try {
        if (auth.name) throw auth
        const { id, email } = auth
        if (id != 2 && email != "admin@mail.com") throw { name: "unAuthorization" }
        else next({ id, email })
    } catch (error) {
        // console.log("ERROR FROM AUTHOR :", error);
        next(error)
    }
}

module.exports = authorization