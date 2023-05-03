// crud etudiant and generate etudiant by csv file
const { randomString } = require('../helpers/Utils');
const { User } = require('../models/User')
const { parse } = require("csv-parse")
const fs = require('fs');
const { sendAcount } = require('../helpers/Mail');
const { subscribeToShudel } = require('../helpers/scheduls');


const createEtudiant = async (req, res) => {
  try {
    const duplicattion = await User.findOne({ email: req.body.email });
    if (duplicattion) {
      return res.status(409).json({ Message: "Email already used" });
    }
    const tempPass = randomString(12, 'abcdefghijklmnopqrstuvwxyz0123456789');
    const newEtudiant = new User({
      ...req.body, role: "Etudiant", password: tempPass,login:req.body.email
    });
    console.log(newEtudiant)
    await subscribeToShudel(newEtudiant)
    const createEtudiant = await newEtudiant.save();
    if (!createEtudiant) {
      res.status(400).json({ Message: "Failed to create" });
    }
    return res.status(201).json({ Message: "Account successfully created" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: error._message, Error: error.message });
  }
};

const uploadMultiple = async (req, res) => {
  try {


    // console.log("file", req.file)
    const results = []
    fs.createReadStream(req.file.path)
      .pipe(parse({
        Comment: "#",
        relax_column_count: true,
        columns: true,
        delimiter: ';'
      }))
      .on('data', (data) => {
        results.push(data)
      })
      .on('error', (err) => {
        res.status(500).send({ Message: "Server Error", Error: error.message });
      })
      .on("end", async () => {
        results.pop();
        console.log("popped", results)
        results.forEach(async student => {
          student.password = randomString(12, 'abcdefghijklmnopqrstuvwxyz0123456789');
          student.login = student.email;

          try {
            await sendAcount(student)
          } catch (error) {
            console.log("##########:", error);
            res.status(500).send({ Message: "Server Error", Error: error.message });
          }

        })
        const createdEtudiant = await User.create(results)
        return res.status(200).json({ Message: "Etudiant updated successfully", data: createdEtudiant });
      })


  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
}

const updateEtudiant = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
       res.status(406).json({ Message: "Missing required params" });
    }
    const { nom, prenom, niveau, classe, date_de_naissance } = req.body;

    const findDuplication = await User.findOne({ _id, role: "Etudiant" });
    if (!findDuplication) {
       res.status(409).json({ Message: "user don t exist" });
    }
    const updateAdmin = await User.findOneAndUpdate(
      { _id, role: "Etudiant" },
      { nom, prenom, niveau, classe, date_de_naissance },
      { new: true }
    );
    if (!updateAdmin) {
       res.status(400).json({ Message: "Failed to update" });
    }
     res.status(200).json({ Message: "Etudiant updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const updatePublic = async (req, res) => {
  try {
    const { _id } = req.user;
    
    const { isPublic } = req.body;
//tdfytfgh
  
    const updateAdmin = await User.findOneAndUpdate(
      { _id, role: "Etudiant" },
      { public: isPublic},
      { new: true }
    );
    if (!updateAdmin) {
       res.status(400).json({ Message: "Failed to update" });
    }
     res.status(200).json({ Message: "Etudiant updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const getAllEtudiant = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const limit = req.query.l || 10;
    
    const count = (await User.find({ role: "Etudiant" })).length;
    const items = await (await User.find({ role: "Etudiant" }))
      .skip(page * limit)
      .limit(limit);
    return res.json({
      Message: "Retrived successfully",
      count,
      items,
      offset: page * limit,
      size: items.length,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const getAllPublicEtudiant = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const limit = req.query.l || 10;
    const count = (await User.find({ role: "Etudiant",public:true })).length;
    const items = await User.find({ role: "Etudiant",public:true })
      .skip(page * limit)
      .limit(limit);
    return res.json({
      Message: "Retrived successfully",
      count,
      items,
      offset: page * limit,
      size: items.length,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const getOneStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Missing required params" });
    }
    const getEtudiant = await User.findOne({ _id, role: "Etudiant" });
    if (!getEtudiant) {
      return res.status(400).json({ Message: "Failed to retrive student" });
    }
    return res
      .status(200)
      .json({ Message: "Stdudent retrived successfully", item: getEtudiant });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----

module.exports = {
  createEtudiant,
  updateEtudiant,
  getAllEtudiant,
  getOneStudent,
  uploadMultiple,
  updatePublic,
  getAllPublicEtudiant
}