
const Demande = require("../models/Demande")


const askingForRecruitment = async (req, res) => {
  try {
    const { type, competances, description } = req.body;
    const alumniId = req.user._id;

    
    if (validation.error)
      return res
        .status(400)
        .json({ Message: validation.error.details[0].message, Success: false });

    const existRecruitment = await Demande.findOne({
      type,
      allumni: alumniId,
    });
    if (existRecruitment)
      return res.status(409).json({
        Message: "recruitment request already exist",
        Success: false,
      });
    const newRequest = new Demande({
      allumni: alumniId,
      etat:"In progress",
      type,
      competances,
      description,
    });
    const createdRequest = await newRequest.save();
    return res.status(200).json({
      Message: "recruitment request created sucessfully",
      Success: true,
      data: createdRequest,
    });
  } catch (error) {}
};

const GetAllVacation = async (req, res) => {
  try {
    const TemporaryRecruitment = await Demande.find({
      type: "vacation",
    }).populate("allumni");
    if (!TemporaryRecruitment)
      return res
        .status(400)
        .json({
          Message: "Failed to find TemporaryRecruitment",
          Success: false,
        });

    return res.status(200).json({
      Message: "TemporaryRecruitment found successfully ",
      data: TemporaryRecruitment,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetAllExpertRecruitment = async (req, res) => {
  try {
    const TemporaryRecruitment = await RecruitmentModel.find({
      type: "Expert",
    }).populate("allumni");
    if (!TemporaryRecruitment)
      return res
        .status(400)
        .json({ Message: "Failed to find ExpertRecruitment", Success: false });

    return res.status(200).json({
      Message: "ExpertRecruitment found successfully ",
      data: TemporaryRecruitment,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  askingForRecruitment,
  GetAllVacation,
  GetAllExpertRecruitment,
};
