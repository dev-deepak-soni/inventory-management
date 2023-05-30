var jwt = require('jsonwebtoken');
const authLogin = async (req, res, next) => {
    
    const accessToken = req.header('access-token');
    const secretKey =  process.env.JWT_secret_key;

    
    if(!accessToken){
        return res.status(500).json({success : false, msg : 'Please Provide Access Token.'})
    }
    
    try {
        var token = jwt.verify(accessToken,secretKey);   
        req.user = token.user; 
        next()
    } catch (error) {
        res.status(500).json({success : false , msg : error.message});
    }
}

module.exports = authLogin;