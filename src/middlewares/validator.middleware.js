export const validate = (schema) => {
    return (request, response, next) => {
        const { error } = schema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
            errors: {
                wrap: {
                    label: false
                }
            }
        });

        if (!error) {
            return next();
        }

        const errorBag = error.details.reduce((acc, detail) => {
            acc[detail.path[0]] = {
                message: detail.message
            };

            return acc;
        }, {});

        response.status(400).json({
            message: "ValidationError",
            errors: { ...errorBag }
        })

    };
};