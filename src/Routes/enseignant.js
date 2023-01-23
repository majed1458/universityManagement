const express = require("express");
const {   createTeacher,
    updateTeacher,
    getAllTeachers,
    getOneTeacher,
    DeleteTeacher,
    addResponsable} = require("../Controlers/EnseignatControler");
const router = express.Router();
const { GererTeacher, logged } = require("../helpers/roleAccess");
const { createTeacherValidation } = require("../validation/TeacherValidation");

// ################ TEACHER ROUTES ################


// ################ ONLY BY ADMIN ################
router.post(
  "/create",
  logged,
  GererTeacher,
  createTeacherValidation(),
  createTeacher
);
router.get(
    "/getAll",
    logged,
    GererTeacher,
    getAllTeachers
  );
  router.get(
    "/getOne/:_id",
    logged,
    GererTeacher,
    getOneTeacher
  );
  router.put(
    "/updateOne/:_id",
    logged,
    GererTeacher,
    updateTeacher
  );
  router.put(
    "/addResponsable/:_id",
    logged,
    GererTeacher,
    addResponsable
  );
  router.delete(
    "/deleteOne/:_id",
    logged,
    GererTeacher,
    DeleteTeacher
  );
  

module.exports = router;
