const yup = require('yup');

const ThingSCHEMA = yup({
    body: yup.string().required().min(3).max(100)
});

module.exports.validateThing = async (req, res, next) => {
    const {body} = req;
    try {
        const validated = await ThingSCHEMA.validate(body);
        if(validated) {
            next();
        }
    } catch(error) {
        next(error);
    }


/*
1. Body не має бути пустим
2. Body має довжину від 3 до 100 символів.

*/
}