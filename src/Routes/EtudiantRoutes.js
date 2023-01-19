const {
    createEtudiantValidation
  } = require("../validation/EtudiantValidation");
const { createEtudiant,
    updateEtudiant, 
    getAllEtudiant,
    uploadMultiple,
    getOneStudent} = require('../Controlers/EtudiantControler');
const express = require('express');
const multer = require('multer');
const path = require("path")

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


router.post("/ajoutEtudiant",createEtudiantValidation(),createEtudiant)
router.post("/addMultiple_Student_csv",upload.single("students_csv"),uploadMultiple)
router.get("/getAll",getAllEtudiant)
router.get("/getOne/:_id",getOneStudent)

router.put("/updateEtudiant/:_id",updateEtudiant)

module.exports=router