const {
    createEtudiantValidation
  } = require("../validation/EtudiantValidation");
const { createEtudiant,
    updateEtudiant, 
    getAllEtudiant,
    uploadMultiple,
    getOneStudent,
    updatePublic,
    getAllPublicEtudiant} = require('../Controlers/EtudiantControler');
const express = require('express');
const multer = require('multer');
const path = require("path");
const { GererEtudiant, logged, isEtudiant } = require("../helpers/roleAccess");

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/csv/')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, `${file.originalname}`)
       
    }
})
const upload = multer({
    storage: storage
})


router.post("/ajoutEtudiant",logged,GererEtudiant,createEtudiantValidation(),createEtudiant)
router.post("/addMultiple_Student_csv",logged,GererEtudiant,upload.single("students_csv"),uploadMultiple)
router.get("/getAll",logged,GererEtudiant,getAllEtudiant)
router.get("/getAllPublic",logged,isEtudiant,getAllPublicEtudiant)

router.put("/updatePublic",logged,isEtudiant,updatePublic)
router.put("/updateEtudiant/:_id",logged,GererEtudiant,updateEtudiant)

router.get("/getOne/:_id",getOneStudent)


module.exports=router