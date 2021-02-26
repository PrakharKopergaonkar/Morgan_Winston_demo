const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("api running");
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})