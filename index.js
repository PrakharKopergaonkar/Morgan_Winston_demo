const express = require('express');
const morgan = require('morgan');
const logger = require('./config/winston.config');
const app = express();

const {v4: uuidv4} = require('uuid')

const port = 8080;

app.use(morgan(":method :url :status :response-time :res[content-length]", {
    stream: logger.stream
}));

app.get('/', (req, res) => {
    res.send("api running");
})

app.get('/demo', (req, res) => {
    res.status(200).json({
        status: true
    })
})
app.get('/demoerror', (req,res) => {
    throw new Error("error")
})

app.get('/democlientError', (req, res) => {
    res.status(400).json({
        status: false
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})