function errorsHandler(error, req, res, next) {
    console.log("ERROR FROM ERRORHANDLE :", error);
    let status, message
    switch (error.name) {
        case "nullEmail":
            status = 400
            message = "Please input Email"
            break;
        case "nullPassword":
            status = 400
            message = "Please input Password"
            break;
        case "failLogin":
            status = 400
            message = "Email or Password are invalid"
            break;
        case "missingData":
            status = 400
            message = "Please fill all form"
            break;
        case "invalidBooking":
            status = 400
            message = error.message
            break;
        case "unAuthentication":
        case "JsonWebTokenError":
            status = 401
            message = "Unauthentication"
            break;
        case "unAuthorization":
            status = 403
            message = "Forbidden"
            break;
        case "notFoundRoom":
            status = 404
            message = "Room Not Found"
            break;
        case "notFoundClient":
            status = 404
            message = "Client Not Found"
            break;
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            status = 400
            message = error.errors[0].message
            break;
        default:
            status = 500
            message = "Internal Server Error"
            break;
    }
    res.status(status).json({ message })
}

module.exports = errorsHandler