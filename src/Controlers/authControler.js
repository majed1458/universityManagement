const { User } =require('../models/User') ;
const {randomString } =require('../helpers/Utils')
const {SendResetPasswordLink} =require('../helpers/Mail');


const generateAccessToken = require("../helpers/AccessToken");


/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
const Login = async (req, res) => {
  try {
    const { login, password, role,remember } = req.body;
    const getUser = await User.findOne({ login,role });
    if (!getUser) {
      return res
        .status(401)
        .json({ Message: "user not found", Success: false });
    }
    const checkPassword = getUser.passwordMatches(password)
    if (!checkPassword) {
      return res
        .status(401)
        .json({ Message: "Password is incorrect", Success: false });
    }
    const maxAge = remember ? "1y" : "12h";
    const token = generateAccessToken(getUser, maxAge);
    return res
      .status(202)
      .json({ Message: "Successfully login", Success: true, token: token });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const duplicattion = await User.findOne({ email: req.body.email });
    if (duplicattion) {
      return res.status(409).json({ Message: "Email already used" });
    }
 
    const newEtudiant = new User({
      ...req.body, role: "Alummni", password: req.body.password,login:req.body.email
    });
    console.log(newEtudiant)
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

/**
 * Send email to a registered user's email with a one-time temporary password
 * @public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { reqEmail } = req.body;
    const user = await User.findOne({ email: reqEmail });
    if (!user) {
      // RETURN A GENERIC ERROR - DON'T EXPOSE the real reason (user not found) for security.
      return res.status(401)
      .json({ Message: "email is incorrect", Success: false });
    }
    // user found => generate temp password, then email it to user:
    const { name, email } = user;
    const tempPass = randomString(12, 'abcdefghijklmnopqrstuvwxyz0123456789');
    user.password = tempPass;
    await user.save();
   const token= generateAccessToken(user,"12h")
  SendResetPasswordLink(reqEmail,token).then(data=>{

    return res
    .status(202)
    .json({ Message: "email sent", Success: true});
  }
  )

  } catch (error) {
    return res.status(401)
    .json({ Message: error.Message, Success: false });
  }
};
const changePass =async(req,res,next)=>{


  try {
    const token = req.body.token.replace("Bearer", "").trim();
    console.log(token);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const userVerif = await User.findOne({email: decoded.email})
    userVerif.password = req.body.newPass;
    await userVerif.save()
    return res
    .status(202)
    .json({ Message: "password changed succesfuly", Success: true});
    
}catch (error) {
  return res.status(401)
  .json({ Message: error.Message, Success: false });
}
}

module.exports={
  Login,
  forgotPassword,
  changePass,signup
}