const express = require('express');
const router = express.Router();

const SalaryEntrySchema = require('../model/SalarySchema');

// == import DB connection == 
const db = require('../db');

// get or create a collection
const salaries = db.get('salaries');
const companies = db.get('companies');

router.get('/:id', async (req, res, next) => {
    try {
        // set param to all or an individual ID
        let searchParam = {};
        if (req.params.id !== 'all')
            searchParam = { _id: req.params.id };

        // search in a DB
        await salaries.find(searchParam)
            .then((doc) => {
                // if no document/s was/were found, notify
                if (doc === null)
                    throw new Error('No entry has been found.');

                res.json({
                    msg: "Your request has been processed.",
                    result: doc
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
// db.close();

router.post('/add', async (req, res, next) => {
    try {
        // validate input
        const result = await SalaryEntrySchema.validateAsync(req.body);
        // remove _id property from newly created salary object
        // _id will be created on insert in BD
        delete result._id;
        // search if entry already exists in DB
        await salaries.findOne(result)
            .then((doc) => {
                // document with matching criteria or null
                if (doc !== null)
                    throw new Error(`Entry with ID: ${ doc._id } is already in DB.`);
            });
        // if entry is unique, insert into DB
        await salaries.insert(result);

        result.technologies.forEach(technology => {
            companies
                .findOneAndUpdate(
                    { name: technology },
                    {
                        $inc:
                            { occurrences: 1 }
                    }
                )
                .then(async updatedDoc => {
                    console.log("then: " + updatedDoc);
                    // if null, add
                    if (!updatedDoc)
                        await companies.insert({
                            name: technology,
                            occurrences: 1
                        });
                })
                .catch(err => {
                    console.error(err);
                    console.log(err);
                });
        }
        );

        res.json({
            msg: "Your entry has been successfully added to the database.",
            schema: result
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
    // db.close();
});

module.exports = router;