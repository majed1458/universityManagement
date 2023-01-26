const express = require("express");
const router = express.Router();
const RecruitmentController = require("../Controlers/recrutement");
const { isAlumni } = require("../helpers/roleAccess");

router.post(
  "/askingForRecruitment",
  isAlumni,
  RecruitmentController.askingForRecruitment
);
router.get(
  "/GetAllTemporaryRecruitment",
  RecruitmentController.GetAllTemporaryRecruitment
);
router.get(
  "/GetAllExpertRecruitment",
  RecruitmentController.GetAllExpertRecruitment
);

module.exports = router;
