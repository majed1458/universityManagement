const { check,validationResult } = require("express-validator");
const { validations } = require("./util");

exports.updateGeneral = (req) => [
  check("nom", "firstName is required").not().isEmpty(),
  check("prenom", "lastName is required").not().isEmpty(),
  check("num_tel", "enter a valid telephone number").isLength({ min: 8,max:8 }),
  check("date_de_naissance", "date de naisance is required").not().isEmpty(),
  (req,res,next)=>{
    validations(req,res,next)
  }

];