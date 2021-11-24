const config = require("config")
require('./db/Mongo')
const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const app = express()
const jobSeeker = require("./routes/JobSeeker");

if (!config.get("jwtPrivateKey")) {
    console.log("JWTPrivateKey not set");
    process.exit(1)
}

app.use(cors())
app.use(express.json())


app.use("/jobSeeker", jobSeeker);

app.use(require('./routes/company'))
app.use(require('./routes/jobSeeker'))

const port = config.get("port");
app.listen(port, () => console.log(`Listening to port ${port}...`));

