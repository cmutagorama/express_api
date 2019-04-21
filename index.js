const express = require('express');
const bodyParser = require('body-parser');

// Creating express application
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ninjago', {
    useNewUrlParser: true
}).then(
    (res) => {
        console.log("Connected to Database Successfully.")
    }
).catch(() => {
    console.log("Connection to database failed.");
});

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// Initialize routes
app.use('/api', require('./routes/api'));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    });
});

// Define local/env port
// const port = process.env.PORT || 3000;

app.listen(4000, () => {
    console.log('Now listening on 4000...');
});