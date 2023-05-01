require('dotenv').config();

const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');

const UserRoutes = require('./routes/UserRoutes');

const ErrorHandler = require('./middlewares/ErrorMiddleware');

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BackendDB';

const app = Express();

app.use(Cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use(UserRoutes);
app.use(ErrorHandler);

app.get('/', (_req, res) => {
    res.send('Home page');
});

Mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at port: ${PORT}
            ${HOST}:${PORT}
            `);
        })
    })
    .catch(error => console.log(error));
    