const config = require("config")
const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const app = express()

if (!confog.get("jwtPrivateKey")) {
    console.log("JWTPrivateKey not set");
    process.exit(1)
}

app.use(cors())
app.use(express.json())

const port = config.get("port");
app.listen(port, () => console.log(`Listening to port ${port}...`));

