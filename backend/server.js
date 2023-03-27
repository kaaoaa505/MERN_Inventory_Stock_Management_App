require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BackendDB';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (_req, res) => {
    res.send('Home page')
});

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at port: ${PORT}
                            ${HOST}:${PORT}
                `);
        })
    })
    .catch(error => console.log(error));