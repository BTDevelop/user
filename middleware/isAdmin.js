const jwt = require('jsonwebtoken')

function extractToken (req) {
    
    if (req.headers['authorization']) {
        const [schema, token] = req.headers['authorization'].split(' ');
        if(schema === 'Bearer')
            return token;
    } 

    if (req.query && req.query.token) {
        return req.query.token;
    } else if (req.body && req.body.token) {
        return req.body.token;
    } else if (req.headers["x-access-token"]) {
        return req.headers["x-access-token"];
    }
    return null;
}

exports.verifyToken = (req,res,next) => {
    const token = extractToken(req);
  
    if (token) {
       const decoded = jwt.decode(token, process.env.JWT_KEY)
       if(decoded.isAdmin){
        next();
       }
       res.status(403).send('You are not an admin')
    } 
}
