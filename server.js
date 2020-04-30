const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env'})
const app = require('./app');


// DATABASE URL STRING
const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD)

// CONNECTING TO DATABASE
mongoose    
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to database successfully...")
    })


// START SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));   