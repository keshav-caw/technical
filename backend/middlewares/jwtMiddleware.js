const jwt = require("jsonwebtoken")

class JWTService{
    constructor() {
      //
    }
    validate(token) {
        try {
            token = token.replace('Bearer ', '')
            const verifiedData = jwt.verify(token, process.env.jwtPrivateKey)
            return verifiedData
        } catch (error) {
            return false;
        }
    }
    encode(details) {
      const jwtToken = jwt.sign(details, process.env.jwtPrivateKey)
      return jwtToken
    }
    decode(token) {
      token = token.replace('Bearer ', '')
      if (token) {
        const jsonPayload = jwt.decode(token)
        return jsonPayload
      } else {
        return null
      }
    }

    jwtMiddleware = (req, res, next) => {
        if (this.validate(req.headers.authorization)) {
            const authToken = this.decode(req.headers.authorization)
            req.user = authToken;
            next();
        }else{
            throw new Error("You have to be logged in for performing this operation");
        }
    }

    adminMiddleware = (req,res,next) => {
        if(!req.user.admin){
            throw new Error("You need to be admin to do this operation");
        }
        next();
    }
};

module.exports = {JWTService}; 

