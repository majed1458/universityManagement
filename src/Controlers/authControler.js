const { User } =require('../models/User') ;
const {randomString } =require('../helpers/Utils')
const SendResetPasswordLink =require('../helpers/Mail');


const generateAccessToken = require("../helpers/AccessToken");


/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const getUser = await User.findOne({ email,role });
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
      return next({ message: 'Invalid request' });
    }
    // user found => generate temp password, then email it to user:
    const { name, email } = user;
    const tempPass = randomString(12, 'abcdefghijklmnopqrstuvwxyz0123456789');
    user.password = tempPass;
    await user.save();
   const token= generateAccessToken(user,"12h")
  await SendResetPasswordLink(user.email,token)
    return res
      .status(202)
      .json({ Message: "email sent", Success: true});;
  } catch (error) {
    return next(error);
  }
};


module.exports={
  Login,
  forgotPassword
}