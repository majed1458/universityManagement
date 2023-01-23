const express = require('express');
const {loginvalidation, forgetlidation}=require("../validation/authValidation")
const {Login, forgotPassword, changePass}=require ("../Controlers/authControler");
const { UpdateGeneralInfos, getMe } = require('../Controlers/userController');
const { logged } = require('../helpers/roleAccess');
const router = express.Router();

router.post("/login",loginvalidation(),Login)
router.post("/forgotPassword",forgetlidation(),forgotPassword)
router.put("/changePass",forgetlidation(),changePass)
router.put(
    "/update_general",
    validator.validationGeneralUpdate,
    logged,
    UpdateGeneralInfos
  );
  router.get(
    "/me",
    
    VerifToken.isUser,
    getMe
  );

module.exports=router