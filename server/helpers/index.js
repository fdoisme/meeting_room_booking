const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.JWT_KEY


function hash(data) {
    return bcrypt.hashSync(data, 10)
}
function hashCompare(data, dataCompare) {
    return bcrypt.compareSync(data, dataCompare)
}
function signToken(data) {
    return jwt.sign(data, SECRET_KEY)
}
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY)
}
function checkBooking(payload, bookingDate, start, end) {
    let booked = []
    const data = payload.map((el) => el.dataValues).filter((el) => el.bookingDate == bookingDate)
    if (data.length == 0) return false
    data.forEach((el) => {
        const start = Number(el.startTime.slice(0, 2))
        const finish = Number(el.endTime.slice(0, 2))
        Array
            .from({ length: finish - start + 1 }, (_, idx) => idx + start)
            .forEach((el) => {
                if (el < 10) booked.push(el)
                else booked.push(el)
            })
    })
    start = Number(start.slice(0, 2))
    end = Number(end.slice(0, 2))
    const arr = Array
        .from({ length: end - start + 1 }, (_, idx) => idx + start)
        .some((el) => booked.includes(el))
    if (arr) return { name: "invalidBooking", message: `Already booked, please check your order time` }
    return false
}
function limitasiCredit(kuota, start, end) {
    start = Number(start.slice(0, 2))
    end = Number(end.slice(0, 2))
    const credit = kuota - (end - start)
    if (credit < 0) return { name: "invalidBooking", message: `You only have ${kuota} hours of credit remaining` }
    return credit
}

module.exports = {
    hash,
    hashCompare,
    signToken,
    verifyToken,
    checkBooking,
    limitasiCredit
}