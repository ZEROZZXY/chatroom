const express = require('express');

const path = require('path');

const app = express();

const port = 8888;

const host = "10.31.162.41";

app.use(express.static(path.join(__dirname, 'client')))

app.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
})