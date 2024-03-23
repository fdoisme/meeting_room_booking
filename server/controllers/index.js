const { signToken, hashCompare, limitasiCredit, checkBooking } = require("../helpers");
const { User, Room, RoomUsage, Client, sequelize } = require("../models")

class Controller {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            const user = await User.create({ name, email, password })
            res.status(201).json(user)
        } catch (error) {
            // console.log("ERROR FROM LOGIN :", error);
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) throw { name: "nullEmail" }
            if (!password) throw { name: "nullPassword" }
            const user = await User.findOne({ where: { email: email.toLowerCase() } })
            if (!user || !hashCompare(password, user.password)) throw { name: "failLogin" }
            let response = signToken({ id: user.id, email: user.email })
            if (email == "admin@mail.com") response = { access_token: user.dataValues.access_token, role: "admin" }
            res.status(200).json(response)
        } catch (error) {
            // console.log("ERROR FROM login :", error);
            next(error)
        }
    }
    static async getRooms(req, res, next) {
        try {
            const rooms = await Room.findAll({
                order: [["id", "ASC"]],
            })
            res.status(200).json(rooms)
        } catch (error) {
            // console.log("ERROR FROM getRooms :", error);
            next(error)
        }
    }
    static async getRoom(req, res, next) {
        try {
            console.log("|||||||||||||||||||||");
            const { id } = req.params
            const room = await Room.findOne({
                where: { id: id, },
                order: [["id", "ASC"]],
                include: [
                    {
                        model: RoomUsage,
                    },
                ]
            })
            res.status(200).json(room)
        } catch (error) {
            // console.log("ERROR FROM getRoom :", error);
            next(error)
        }
    }
    static async booking(auth, req, res, next) {
        try {
            const { id } = req.params
            const { email, startTime, endTime, bookingDate } = req.body
            if (!startTime || !endTime || !bookingDate) {
                throw { name: "missingData" }
            }
            if (auth.name) throw auth
            const result = await sequelize.transaction(async (t) => {
                const room = await Room.findOne({
                    where: { id },
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });
                if (!room) throw { name: "notFoundRoom" }
                const client = await Client.findOne({
                    where: { email: email.toLowerCase() },
                    transaction: t,
                });
                if (!client) throw { name: "notFoundClient" }
                const credit = limitasiCredit(client.dataValues.credit, startTime, endTime)
                if (credit.name) throw credit
                Client.update(
                    { credit },
                    {
                        where: { id: client.dataValues.id },
                        transaction: t,
                    }
                )
                const roomUsages = await RoomUsage.findAll({
                    where: {
                        roomId: room.dataValues.id
                    },
                    transaction: t
                });
                const isConflict = checkBooking(roomUsages, bookingDate, startTime, endTime)
                if (isConflict.name) throw isConflict
                const roomUsage = await RoomUsage.create({
                    clientId: client.id, roomId: id, startTime, endTime, bookingDate, quotaUsed: 5
                }, { transaction: t });
                return roomUsage;
            });
            res.status(201).json(result)
        } catch (error) {
            // console.log("ERROR FROM booking :", error);
            next(error)
        }
    }
    static async cancelBooking(author, req, res, next) {
        try {
            if (author.name) throw author
            const idRoomUsages = req.params.id
            const { id, email } = author
            res.status(200).json(author)
        } catch (error) {
            console.log("ERROR FROM cancelBooking :", error);
            next(error)
        }
    }
    static async addClient(author, req, res, next) {
        try {
            const { name, email, phone, credit } = req.body
            const client = await Client.create({ name, email, phone, credit })
            res.status(201).json(client)
        } catch (error) {
            // console.log("ERROR FROM addClient :", error);
            next(error)
        }
    }
}

module.exports = Controller