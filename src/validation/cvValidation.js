
const { check,validationResult } = require("express-validator");
const { validations } = require("./util");

exports.cvValidation = (req) => [
  check("bio", "firstName is required").not().isEmpty(),
  check("localisation", "lastName is required").not().isEmpty(),
  check("linkedIn", "enter a valid telephone number").not().isEmpty(),
  check("experiences.*.*", "date de naisance is required").notEmpty(),
  check("formations.*.*", "date de naisance is required").notEmpty(),
  check("languages.*.*", "date de naisance is required").notEmpty(),
  check("hard_skills.*.*", "date de naisance is required").notEmpty(),

  check("soft_skills.*.*", "date de naisance is required").notEmpty(),
  check("hobbys.*.*", "date de naisance is required").notEmpty(),


  (req,res,next)=>{
    validations(req,res,next)
  }

];

