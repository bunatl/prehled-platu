const Joi = require('joi');

const schema = Joi.object({
    position: Joi.string()
        .required(),

    company: Joi.string()
        .required(),

    technologies: Joi.array()
        .items(
            Joi.string()
        )
        .required(),

    description: Joi.string()
        .allow(null, ''), // allow null: https://stackoverflow.com/questions/42370881/allow-string-to-be-null-or-empty-in-joi-and-express-validation

    location: Joi.string()
        .required(),

    employmentForm: Joi.string()
        .required(),

    salary: Joi.number()
        .min(1),

    salaryRate: Joi.string()
        .required(),

    firstWorkDay: Joi.date()
        .greater('1-1-1993')
        .less('now')
        .required(),

    monthsWorked: Joi.number()
        .min(1),

    _id: Joi.string()
        .allow(null, '')

});

module.exports = schema;