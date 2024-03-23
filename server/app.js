if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const router = require("./routes")
const cors = require('cors');
const errorsHandler = require('./middleware/errorsHandler');
const port = process.env.PORT || 2024

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorsHandler)

app.listen(port, () => {
    console.log("Connected to port " + port);
})