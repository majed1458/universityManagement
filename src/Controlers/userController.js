const UserModel =require("../models/User")

const UpdateGeneralInfos = async (req, res) => {
    try {
      const { _id } = req.user;
      // firstName, lastName, phoneNumber, birthDate, sex
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id },
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(400).json({
          Message: "Failed to update",
          Success: false,
        });
      }
      return res.status(200).json({ Message: "User updated", data: updatedUser });
    } catch (error) {
      console.log("##########:", error);
      res.status(500).send({ Message: "Server Error", Error: error.message });
    }
  };

  const getMe = async (req, res) => {
    try {
      const { _id } = req.user;
      // firstName, lastName, phoneNumber, birthDate, sex
      const getdUser = await UserModel.findOnee(
        { _id }
      );
      if (!getdUser) {
        return res.status(400).json({
          Message: "Failed to retreave",
          Success: false,
        });
      }
      return res.status(200).json({ Message: "User got", data: getdUser });
    } catch (error) {
      console.log("##########:", error);
      res.status(500).send({ Message: "Server Error", Error: error.message });
    }
  };
  module.exports={
    UpdateGeneralInfos,
    getMe
  }