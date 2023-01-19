const jwt = require("jsonwebtoken");

module.exports = (object, maxAge) =>{
  return jwt.sign(object.toObject(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  })
};