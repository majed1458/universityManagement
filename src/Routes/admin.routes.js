const express = require('express');
const validate = require('express-validation');
const { createDirecteurStage, createAdministratif, UpdateAdminPermessions,getAdmins } = require('../Controlers/AdminContoller');
const { isDirecteurStage, logged } = require('../helpers/roleAccess');
const { createAdminValidation, updateAccesAdminValidation } = require('../validation/adminValidation');

const router = express.Router();
router.get("/ajout_Directeur_Stage",createDirecteurStage)
router.get("/getAdmins",logged,isDirecteurStage,getAdmins)

router.post("/ajoutAdministratif",logged,isDirecteurStage,createAdminValidation(),createAdministratif)
router.put("/updatePermession/:_id",logged,isDirecteurStage,updateAccesAdminValidation(),UpdateAdminPermessions)

module.exports=router