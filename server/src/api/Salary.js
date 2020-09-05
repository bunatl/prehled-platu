const express = require('express');
const router = express.Router();

const SalaryEntrySchema = require('../model/SalarySchema');

// == DB connection == 
const db = require('monk')('localhost/salaries-cz');
// get or create a collection
const salaries = db.get('salaries');

router.get('/salary/:id', async (req, res, next) => {
    try {
        // set param to all or an individual ID
        let searchParam = {};
        if (req.params.id !== 'all')
            searchParam = { _id: req.params.id };

        // search in a DB
        await salaries.find(searchParam)
            .then((doc) => {
                // if no document/s was/were found, notify
                if (doc === null) {
                    console.error('No entry has been found.');
                    res.status(422);
                    return;
                }
                res.json({
                    msg: "Your request has been processed.",
                    result: doc
                });
            });
    }
    catch (err) {
        res.status(422);
        res.json({
            msg: "An Error has occcured. For more info see err property.",
            err
        });
    }
    db.close();
});

router.post('/salary/add', async (req, res, next) => {
    try {
        console.log(req.body);
        // validate input
        const result = await SalaryEntrySchema.validateAsync(req.body);
        // search if entry already exists in DB
        await salaries.findOne(result)
            .then((doc) => {
                // document with matching criteria or null
                if (doc !== null) {
                    console.error(`Entry with ID: ${ doc._id } is already in DB.`);
                    res.status(422);
                    return;
                }
            });
        // if entry is unique, insert into DB
        await salaries.insert(result);

        res.json({
            msg: "Your entry has been successfully added to the database.",
            schema: result
        });
    }
    catch (err) {
        console.log(err);
        res.status(422);
        res.json({
            msg: "An Error has occcured. For more info see err property.",
            err: err.details.message
        });
    }
    db.close();
});


module.exports = router;