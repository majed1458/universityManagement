// crud etudiant and generate etudiant by csv file
const { randomString } = require('../helpers/Utils');
const { User } = require('../models/User')
const { parse } = require("csv-parse")
const fs = require('fs');
const { sendAcount } = require('../helpers/Mail');


const createTeacher = async (req, res) => {
  try {
    const { isResposable, responsable } = req.body
    const duplicattion = await User.findOne({ email: req.body.num_tel });
    if (duplicattion) {
      res.status(409).json({ Message: "Email already used" });
    }
    if (isResposable) {
      const newTeacher = new User({
        ...req.body, role: "enseignant", password: req.body.num_tel, login: req.body.num_tel
      });
      await sendAcount(newTeacher)
      const createdTeacher = await newTeacher.save();
      if (!createdTeacher) {
        res.status(400).json({ Message: "Failed to create" });
      }
      res.status(201).json({ Message: "Account successfully created", data: createdTeacher });


    }
    if (!isResposable) {
      if (!req.body.responsable) {
        res.status(400).json({ Message: "Failed to create resposable is required" });
      }
      const newTeacher = new User({
        ...req.body, role: "enseignant", password: req.body.num_tel, login: req.body.num_tel, responsableFormation: responsable
      });
      await sendAcount(newTeacher)
      const createdTeacher = await newTeacher.save();
      if (!createdTeacher) {
        res.status(400).json({ Message: "Failed to create" });
      }
      res.status(201).json({ Message: "Account successfully created", data: createdTeacher });

    }



  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: error._message, Error: error.message });
  }
};



const updateTeacher = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Missing required params" });
    }
    const { nom, prenom, num_tel, password } = req.body;

    const findDuplication = await User.findOne({ _id, role: "enseignant" });
    if (!findDuplication) {
      return res.status(409).json({ Message: "user don t exist" });
    }
    const updateTeacher = await User.findOneAndUpdate(
      { _id, role: "enseignant" },
      { nom, prenom, num_tel, password },
      { new: true }
    );
    if (!updateTeacher) {
      return res.status(400).json({ Message: "Failed to update" });
    }
    return res.status(200).json({ Message: "teacher updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};


const getAllTeachers = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const limit = req.query.l || 10;
    const count = (await User.find({ role: "enseignant" })).length;
    const items = await User.find({ role: "enseignant" })
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

const getOneTeacher = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Missing required params" });
    }
    const getTeacher = await User.findOne({ _id, role: "enseignant" });
    if (!getTeacher) {
      return res.status(400).json({ Message: "Failed to retrive student" });
    }
    return res
      .status(200)
      .json({ Message: "Stdudent retrived successfully", item: getTeacher });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----
const DeleteTeacher = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeTeacher = await User.deleteOne({ _id,role:"enseignant" });

    if (!removeTeacher) {
      return res.status(400).json({ Message: "Failed to delete teacher" });
    }
    await User.findOneAndUpdate({responsableFormation:_id},{responsableFormation:null},
      { new: true })
    return res.status(200).json({ Message: "teacher deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const addResponsable = async(req,res,next)=>{
  try {
    const { _id } = req.params;
   
    const { responsable } = req.body;

    const findDuplication = await User.findOne({ _id, role: "enseignant",isResposable:false });
    if (!findDuplication) {
      return res.status(409).json({ Message: "user don t exist" });
    }
    const updateTeacher = await User.findOneAndUpdate(
      { _id, role: "enseignant" },
      { responsable:responsable },
      { new: true }
    );
    if (!updateTeacher) {
      return res.status(400).json({ Message: "Failed to update" });
    }
    return res.status(200).json({ Message: "teacher updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
}
module.exports = {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  getOneTeacher,
  DeleteTeacher,
  addResponsable

}