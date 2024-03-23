const Controller = require("../controllers");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Server is running");
});

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get("/rooms", Controller.getRooms)
router.get("/rooms/:id", Controller.getRoom)
router.post("/booking/:id", authentication, Controller.booking)

// acting like client-admin
router.delete("/cancel/:id", authentication, authorization, Controller.cancelBooking)
router.post("/addClient", authentication, authorization, Controller.addClient)

module.exports = router;