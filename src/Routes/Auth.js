const express = require('express');
const validate = require('express-validation');
const {Login}=require ("../Controlers/authControler")
const router = express.Router();

router.post("login",Login)
module.exports=router