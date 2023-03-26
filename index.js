const express = require('express');

const router = require('./routes/myRouter')

const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(router)

app.listen(8080, () => {
    console.log('Run server that port 8080')
})

