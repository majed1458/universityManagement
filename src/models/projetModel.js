const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectModel = new Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    encadrants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    technologies: [
      {
        type: String,
       
      },
    ],

    societe: {
      type:String,
      
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

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },
    isValidatedByReponsable: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Project", ProjectModel);
