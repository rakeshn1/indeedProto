const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/./../config/config.env' });

const DB = process.env.DATABASE
mongoose.connect("", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // poolSize: 20
}).then(con => {
    console.log('MongoDB connection successful!')
}).catch(err => {
    console.log(err)
})
