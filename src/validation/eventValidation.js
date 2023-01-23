const { check,validationResult } = require("express-validator");
const { validations } = require("./util");

exports.createEventValidation = (req) => [
  check("eventName", "event Name is required").not().isEmpty(),
  check("eventDate", "eventDate is required").not().isEmpty(),
  check("eventType", "enter a valid eventType").isIn(['JPO', "journe d'integration", 'formation']),
  check("description", "description is required").not().isEmpty(),
  (req,res,next)=>{
    validations(req,res,next)
  }

];
