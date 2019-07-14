const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    const authHeader = req.get('Authorization');
    if(!authHeader)
    {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
   // console.log('hey')
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,'somesupersecretsecret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    } 

     decodedToken = jwt.verify(token, 'somesupersecretsecret');
    // console.log(decodedToken.doc._id)
    if(!decodedToken)
    {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.doc._id;
    req.doc = decodedToken.doc;
  //  console.log(req.userId);
    next();
}