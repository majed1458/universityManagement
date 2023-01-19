const { check,validationResult } = require("express-validator");

exports.createEtudiantValidation = (req) => [
  check("nom", "firstName is required").not().isEmpty(),
  check("prenom", "lastName is required").not().isEmpty(),
  check("email", "enter a valid email").isEmail(),
  check("niveau", "niveau is required").not().isEmpty(),
  check("classe", "classe is required").not().isEmpty(),
  check("date_de_naissance", "date de naisance is required").not().isEmpty(),
 
  check("alumni", "value diplome is required").not().isEmpty().isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("wselethne")
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },

];
exports.loginvalidation = () => [
  check("email", "enter a valid email").not().isEmpty(),
  check("password", "enter a valid password").isLength({ min: 6 }),
];


exports.validations=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}