// path only needs to be required, not installed
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');


//handle cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
 
//api route handler
app.use('/api', apiRouter);

//user route handler
app.use('/user', userRouter);

// local 404 handler
app.use((req, res) => res.status(404).send('404: PAGE DOES NOT EXIST'));

// Global error handling middleware
app.use((err, req, res, next) => res.status(500).json(err));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;