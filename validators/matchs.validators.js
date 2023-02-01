import Joi from "joi"

export const matchValidator = (req, res, next) => {
    let schema;

    if (req.method === "POST") {
        schema = Joi.object({
            homeTeam: Joi.string().required(),
            awayTeam: Joi.string().required(),
            date: Joi.date().required(),
            place: Joi.string().required(),
            category: Joi.array().required(),
            sport: Joi.string().required(),
            homePoints: Joi.number(),
            awayPoints: Joi.number(),
            homeFouls: Joi.number(),
            awayFouls: Joi.number(),
            duration: Joi.number().required(),
        }); 
    } else {
        schema = Joi.object({
            homeTeam: Joi.string(),
            awayTeam: Joi.string(),
            date: Joi.date(),
            place: Joi.string(),
            category: Joi.array(),
            sport: Joi.string(),
            homePoints: Joi.number(),
            awayPoints: Joi.number(),
            homeFouls: Joi.number(),
            awayFouls: Joi.number(),
            duration: Joi.number(),
        });
    }

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
    console.log(error);
    console.log(value);
    if (error) {
        // on fail return comma separated errors
        next(`Validation error: ${error.details.map(x => x.message).Join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}