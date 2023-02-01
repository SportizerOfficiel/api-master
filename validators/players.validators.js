import Joi from "joi"

export const playerValidator = (req, res, next) => {
    let schema;

    if (req.method === "POST") {
        schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            idTH: Joi.string().required(),
            idClub: Joi.string().required(),
            birthDate: Joi.string().required(),
            // address: Joi.string().required(),
            sport: Joi.string().required(),
            category: [Joi.string(), Joi.array()],
            matchsPlayed: Joi.object()
        });    
    } else {
        schema = Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            idTH: Joi.string(),
            idClub: Joi.string(),
            birthDate: Joi.string(),
            category: Joi.array(),
            matchsPlayed: Joi.object()
        });
    }
    

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body);
    console.log(error);
    console.log(value);
    if (error) {
        // on fail return comma separated errors
        console.log(error)
        next(`Validation error: ${error.details.map(x => x.message).Join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}