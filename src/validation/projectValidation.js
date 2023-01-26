const { check,validationResult } = require("express-validator");
const { validations } = require("./util");

exports.projectValidation = (req) => [
  check("title", "project Name is required").not().isEmpty(),
  check("type", "enter a valid type of project").isIn(["PFA", "PFE", "Stage"]),
  check("description", "description is required").not().isEmpty(),
  (req,res,next)=>{
    validations(req,res,next)
  }

];



exports.projectValidationPfa = (req) => [
  check("title", "project Name is required").not().isEmpty(),
  check("description", "description is required").not().isEmpty(),
  check("technologies", "technologies are required").isArray(),
  check("technologies.*", "technologies name are required").exists(),


  (req,res,next)=>{
    validations(req,res,next)
  }

];

  
exports.projectValidationStage = (req) => [
  check("title", "project Name is required").not().isEmpty(),
  check("societe", "societé Name is required").not().isEmpty(),
  check("startDate", "societé Name is required").not().isEmpty(),
  check("endDate", "societé Name is required").not().isEmpty(),

  check("description", "description is required").not().isEmpty(),
  check("technologies", "technologies are required").isArray(),
  check("technologies.*", "technologies name are required").exists(),


  (req,res,next)=>{
    validations(req,res,next)
  }

];