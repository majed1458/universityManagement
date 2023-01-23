const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

exports.logged = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userVerif = await User.findOne({ email: decoded.email }).select('nom prenom role access acces.droit');
    req.user = userVerif;

    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, message: "not loged in" });
  }
};
exports.isDirecteurStage = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "Directeur_Stage") {
    res.status(302).json({ success: false, message: "vous n'etes pas le directeur" });
  }


  next();
}
exports.isEtudiant = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "Etudiant") {
    res.status(302).json({ success: false, message: "vous n'etes pas etudiant" });
  }


  next();
}
exports.GererEtudiant = (req, res, next) => {


  try {
    console.log(req.user);
 
    if (req.user.role === 'Administratif') {
      const getAcces = req.user.access.find(elem => { elem.droit = "GERER_ETUDIANT" })
      console.log(getAcces)
      if (getAcces == -1) {
        return res.status(302).json({ success: false, message: "vous n avez pas l acces" });
      }
      next()
    }
    if (req.user.role === 'Directeur_Stage'){
      next()
    }
    else{
      return res.status(302).json({ success: false, message: "vous n avez pas l acces" });
    }
  } catch (err) {
    return res.status(302).json({ success: false, message: err.message });
  }

};
exports.GererEvent = (req, res, next) => {
  try {
    if (req.user.role === 'Administratif') {
      const getAcces = req.user.access.find(elem => { elem.droit = "GERER_EVENNEMENT" })
      console.log(getAcces)
      if (getAcces == -1) {
        return res.status(302).json({ success: false, message: "vous n avez pas l acces" });
      }
      next()
    }
    if (req.user.role === 'Directeur_Stage'){
      next()
    }
    else{
      return res.status(302).json({ success: false, message: "vous n avez pas l acces" });
    }
  } catch (err) {
    return res.status(302).json({ success: false, message: err.message });
  }
  };
exports.GererTeacher = (req, res, next) => {
  try {
  if (req.user.role === 'Administratif') {
    const getAcces = req.user.access.find(elem => { elem.droit = "GERER_ENSEIGNATS" })
    console.log(getAcces)
    if (getAcces == -1) {
      return res.status(302).json({ success: false, message: "vous n avez pas l acces" });
    }
    next()
  }
  if (req.user.role === 'Directeur_Stage'){
    next()
  }
  else{
    return res.status(302).json({ success: false, message: "vous n avez pas l acces" });
  }
} catch (err) {
  return res.status(302).json({ success: false, message: err.message });
}
};

