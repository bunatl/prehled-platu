const express = require('express');
const router = express.Router();

const SalaryEntrySchema = require('../model/SalarySchema');


// == DB connection == 
const db = require('monk')('localhost/salaries-cz');
// get or create a collection
const salaries = db.get('salaries');

router.post('/', async (req, res, next) => {
    try {
        const result = await SalaryEntrySchema.validateAsync(req.body);

        // search all
        const items = await salaries.find({});
        // insert int DB - watch out for duplicates
        salaries.insert(result);

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