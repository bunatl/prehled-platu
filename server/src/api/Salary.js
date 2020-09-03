const express = require('express');
const router = express.Router();

const SalaryEntrySchema = require('../model/SalarySchema');

// == DB connection == 
const db = require('monk')('localhost/salaries-cz');
// get or create a collection
const salaries = db.get('salaries');

router.post('/', async (req, res, next) => {
    try {
        // validate input
        const result = await SalaryEntrySchema.validateAsync(req.body);
        // search all
        // const items = await salaries.find({});
        // search if entry already exists in DB
        await salaries.findOne(result)
            .then((doc) => {
                // document with matching criteria or null
                if (doc !== null) {
                    console.error('Already added');
                    res.status(400);
                    return;
                }
            });
        // if entry is unique, insert into DB
        await salaries.insert(result);

        res.json({
            msg: "validation sucessfull",
            schema: result
        });
    }
    catch (err) {
        res.status(422);
        res.json({
            msg: "wrong! an error",
            err
        });
    }
    db.close();
});


module.exports = router;