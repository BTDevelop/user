const { HexaError } = require('./hexa-error')

class DBConnectionError extends HexaError {
    statusCode=400
    constructor(message){
        super(message) 
        this.name = 'DBConnectionError'
}
}

module.exports = { DBConnectionError }