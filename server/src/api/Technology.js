const express = require('express');
const router = express.Router();

// == import DB connection == 
const db = require('../db');

// get or create a collection
const technologies = db.get('technologies');

router.get('/', async (req, res, next) => {
    try {
        // search in a DB
        technologies
            .aggregate([
                { $sort: { occurrences: -1 } },
                { $limit: 5 }
            ])
            .then((doc) => {
                // if no document/s was/were found, notify
                if (doc === null)
                    throw new Error('No entry has been found.');

                const reducedDoc = doc.reduce((reduceArr, x) => {
                    // returns only lenght of new array
                    reduceArr.push(x.name);
                    return reduceArr;
                }, []);

                res.json({
                    msg: "Your request has been processed.",
                    result: reducedDoc
                });
            });
    }
    catch (err) {
        console.log(err.message);
        res.status(422);
        res.json({
            msg: "An Error has occcured. For more info see err property.",
            err: err.message
        });
    }
});

module.exports = router;
