const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid')

const port = 8080;

morgan.token("host", (req, res) => {
    return req.headers['host']
})

morgan.token("id",(req,res) => {
    return req.id;
})

app.use(assignId);

function assignId(req, res, next) {
    req.id = uuidv4();
    next();
}

app.use(morgan(":id :method :url :status :res[content-length] :res[content-type] :host", {
    stream: fs.createWriteStream(path.join(__dirname, "info.log"), {flags: 'a'})
}));

app.get('/', (req, res) => {
    res.send("api running");
})

app.get('/demo', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'api working'
    })
})

app.get('/demoerror', (req,res) => {
    throw new Error("new error")
})



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})