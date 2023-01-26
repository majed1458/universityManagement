const express = require('express');
const {loginvalidation, forgetlidation}=require("../validation/authValidation")
const {Login, forgotPassword, changePass, signup}=require ("../Controlers/authControler")
const router = express.Router();

router.post("/login",loginvalidation(),Login)
router.post("/signup",loginvalidation(),signup)

router.post("/forgotPassword",forgetlidation(),forgotPassword)
router.put("/changePass",forgetlidation(),changePass)


module.exports=router