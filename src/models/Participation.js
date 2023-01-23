const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipationModel = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    confirmation: {
      type: Boolean,
      required: true,
      default: false,
    },

    isInvitation: {
      type: Boolean,
      required: true,
      default: false,
    },
 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Participation", ParticipationModel);
