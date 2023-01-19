const express = require('express');
const validate = require('express-validation');
const { createSaison } = require('../Controlers/SaisonUniv');

const router = express.Router();
router.post("/ajoutSaison",createSaison)
module.exports=router