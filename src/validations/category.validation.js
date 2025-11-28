import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().max(255).required(),
});

export default categorySchema;


