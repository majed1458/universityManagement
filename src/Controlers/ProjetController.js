const cvModel = require("../models/cv.model");
const ProjectModel = require("../models/projetModel");
const studentModule = require("../models/User");


const CreateProjectPfa = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
     
    } = req.body;

    const existProject = await ProjectModel.findOne({
      title,
      description,
      type: "PFA"
    });
    if (existProject)
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });
    console.log(req.params);
    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: "PFA",

      technologies: technologies,
     

      isValidatedByReponsable: false,
      publisher: req.user._id
    });
    console.log("######[" + JSON.stringify(newProject) + "]######:");
    await newProject.save()
    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: newProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const CreateStage = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      societe,
      startDate,
      endDate

    } = req.body;

    const existProject = await ProjectModel.findOne({
      title,
      description,
      type: "Stage"
    });
    if (existProject)
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });
    console.log(req.params);
    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: "Stage",
      technologies: technologies,
      publisher: req.user._id,
      societe,
      startDate,
      endDate
    });
    console.log("######[" + JSON.stringify(newProject) + "]######:");
    await newProject.save()
    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: newProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const CreatePfe = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      societe,
      startDate,
      endDate,
      


    } = req.body;

    const existProject = await ProjectModel.findOne({
      title,
      description,
      type: "PFE"
    });
    if (existProject)
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });
    console.log(req.params);
    const newProject = new ProjectModel({
      title,
      description,
      technologies,
      societe,
     
      startDate,
      endDate,
     
      type: "PFE",

      publisher: req.user._id
    });
    console.log("######[" + JSON.stringify(newProject) + "]######:");
    await newProject.save()
    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: newProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetTeacherProjects = async (req, res) => {


  try {
    const Projects = await ProjectModel.find({ publisher: req.user._id });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const selectPfa = async (req, res) => {
  try {
    const { _id } = req.params
    const Project = await ProjectModel.find({ _id, type: "PFA" });
    if (!Project) {
      return res.status(409).json({
        Message: "Project don t exist",
        Success: false,
      });
    }
    if (Project.PFAstudents) {
      return res.status(409).json({
        Message: "Project has been selected by other",
        Success: false,
      });
    }
    Project.PFAstudents = req.use._id
    await Project.save()
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Project });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const selectPfe = async (req, res) => {
  try {
    const { _id } = req.params
    const Project = await ProjectModel.find({ _id });
    if (!Project) {
      return res.status(409).json({
        Message: "Project don t exist",
        Success: false,
      });
    }
    Project.encadrant = req.user._id
    await Project.save()
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Project });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const getEtudiantPfe = async (req, res) => {
  try {
    const { _id } = req.params
    const Project = await ProjectModel.find({ _id, type: "PFE" });
    if (!Project) {
      return res.status(409).json({
        Message: "Project don t exist",
        Success: false,
      });
    }
    const etudiant = await studentModule.findOne({ _id: Preject.publisher })
    const studentCv = await cvModel.findOne({ student: Preject.publisher })

    await Project.save()
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", etudiant, studentCv });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllProjects = async (req, res) => {

  try {
    const Projects = await ProjectModel.find();
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllProjectsByType = async (req, res) => {
  const { type } = req.params;

  try {
    const Projects = await ProjectModel.find({ type });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateProjectPfa,
  GetAllProjects,
  GetAllProjectsByType,
  GetTeacherProjects,
  CreateStage,
  selectPfa,
  CreatePfe,
  selectPfe,
  getEtudiantPfe
};
