
const { check,validationResult } = require("express-validator");
const {validations} = require("./util")

exports.loginvalidation = (req) => [
    check("login", "enter a valid email").not().isEmpty(),
    check("password", "enter a valid password").isLength({ min: 6 }),
    check("role", "role is required").not().isEmpty(),
    check("remember", "value remember is required").not().isEmpty().isBoolean(),
    (req,res,next)=>{
        validations(req,res,next)

    }
];
exports.forgetlidation = (req) => [
    check("reqEmail", "enter a valid email").not().isEmpty(),
 
    (req,res,next)=>{
        validations(req,res,next)

    }
];

exports.changePass = (req) => [
    check("reqEmail", "enter a valid email").not().isEmpty(),
 
    (req,res,next)=>{
        validations(req,res,next)

    }
];