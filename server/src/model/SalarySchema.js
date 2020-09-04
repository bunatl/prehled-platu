const Joi = require('joi');

const schema = Joi.object({
    position: Joi.string()
        .required(),

    company: Joi.string()
        .required(),

    technologies: Joi.string()
        .required(),

    description: Joi.string()
        .allow(null, ''), // allow null: https://stackoverflow.com/questions/42370881/allow-string-to-be-null-or-empty-in-joi-and-express-validation

    location: Joi.string()
        .required(),

    salary: Joi.number()
        .min(14000)
        .max(1000000),

    firstWorkDay: Joi.date()
        .greater('1-1-1993')
        .less('now')
        .required(),

    yearsWorked: Joi.number()
        .min(1)
        .max(new Date().getFullYear() - 1993)

});

module.exports = schema;