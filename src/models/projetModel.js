const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectModel = new Schema(
  {



    encadrant:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    technologies: [{
      name: {
        type: String,

      }
    }],
    PFAstudents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    societe: {
      type: String,

    },
    type: {
      type: String,
      enum: ["PFA", "PFE", "Stage"],

      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nbr_students_max: {
      type: Number,
      //  default: 2,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },
    isValidatedByReponsable: {
      type: Boolean
      
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Project", ProjectModel);
