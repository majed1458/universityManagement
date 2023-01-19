const express = require('express');
const validate = require('express-validation');
const { createAdmin } = require('../Controlers/AdminContoller');

const router = express.Router();
router.get("/ajoutAdmin",createAdmin)
module.exports=router