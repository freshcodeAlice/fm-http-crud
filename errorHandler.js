const DataBaseError = require('./errors/DataBaseError');
const {ValidationError} = require('yup');

module.exports.basicErrorHandler = (err, req, res, next) => {
    if (err instanceof DataBaseError) {
        return res.status(400).send('Something wrong with database')
    } 

    if(err instanceof ValidationError) {
        return res.status(400).send('Invalid data');
    }

    if(err instanceof Error) {
        return res.status(401).send('Some unknown error')
    }
}