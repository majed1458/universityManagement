const mongoose = require("mongoose");

const RecruitmentSchema = new mongoose.Schema({
  allumni: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["vacation", "Expert"],
    required: true,
  },
  etat: {
    type: String,
    enum: ["Rejected", "Accepted", "In progress"],
    required: true,
    default: "In progress",
  },
  competances: [{
    nom: {
      type: String,
      required: true,
    },
    nbre_anné: {
      type: Number,
      required: true
    }

  }],
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Recruitment ", RecruitmentSchema);
