const {HexaError} = require('../errors/hexa-error');

const errorHandler = (err,req,res,next) => {
    if (err instanceof HexaError) {
        
        return res.status(err.statusCode).send({ result:'ERR', statusCode:err.statusCode, error: err.serializeError() });
    } else {
        res.status(400).send({result:'ERR',statusCode:400, error: { message: err.message }});
    }
    
    
}

module.exports = errorHandler;
