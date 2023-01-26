const express = require("express");
const router = express.Router();
const CvController = require("../Controlers/cvControler");
const { logged, isDirecteurStage } = require("../helpers/roleAccess");
const { cvValidation } = require("../validation/cvValidation");

// ################ CV ROUTES ################
router.post(
  "/create",
  logged,
  cvValidation,
  CvController.CreateCv
);
router.get("/get_cv_by_user", logged, CvController.getcvbyuser);

router.put(
  "/update",

  logged,
  CvController.UpdateCv
);

// ################ ONLY BY ADMIN ################
router.get("/getall",logged, isDirecteurStage, CvController.GetAllCvs);

module.exports = router;
