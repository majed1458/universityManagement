const express = require("express");
const router = express.Router();
const ProjectController = require("../Controlers/ProjetController");
const { logged, isTeacher, isEtudiant, isEtudiantNotAlumni } = require("../helpers/roleAccess");
const { projectValidation,projectValidationPfa, projectValidationStage } = require("../validation/projectValidation");

router.post("/createPFA",logged,isTeacher,projectValidationPfa(), ProjectController.CreateProjectPfa);
router.post("/createStage",logged,isEtudiantNotAlumni,projectValidationStage(), ProjectController.CreateStage);
router.post("/createpfe",logged,isEtudiantNotAlumni,projectValidationPfa(), ProjectController.CreatePfe);

router.get("/getAll/:type", ProjectController.GetAllProjectsByType);
router.get("/getAll",logged, ProjectController.GetAllProjects);
router.get("/getStudentCv/:_id",logged,isTeacher, ProjectController.getEtudiantPfe);
router.get("/getTeacherprojects",logged,isTeacher, ProjectController.GetTeacherProjects);


router.put("/selectPfa/:_id",logged,isEtudiantNotAlumni, ProjectController.selectPfa);
router.put("/selectPFE/:_id",logged,isTeacher, ProjectController.selectPfe);





module.exports = router;
