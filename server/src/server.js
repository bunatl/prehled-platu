const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const Salary = require('./api/Salary');

const app = express();

/* 
    For security reasons
    Removes X-Powered-by: Express header
    Add/mask other header properties 
*/
app.use(helmet());
app.use(morgan('dev'));

// CORS policy
app.use(cors({
    //only frontend can access backend
    origin: process.env.CORS_ORIGIN,
}));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());

/* == Routing == */
app.get('/', (req, res) => {
    res.json({
        msg: "hello from server file server.js"
    });
});

app.use('/api', Salary);

/* == Listen == */
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port: ${ port }`);
});