const express = require("express");
//---------------------------------------------------------
const adminRouter = require("./admin.routes");
const etudiantRoutes = require("./EtudiantRoutes");
const saisonRoutes = require("./Saison.routes");
const evenRoutes = require('./eventRoutes')
const teacherRoutes = require('./enseignant')
const projectRoutes =require("./project")
const cvRoutes =require("./cvRoutes")
const auth = require("./Auth");

//---------------------------------------------------------
const router = express.Router();
//---------------------------------------------------------
router.get("/test", (req, res) => res.send("Working"));
router.use("/admin", adminRouter);
router.use("/Etudiant", etudiantRoutes);
router.use("/Saison", saisonRoutes);
router.use("/Event", evenRoutes);
router.use("/project", projectRoutes);
router.use("/cv", cvRoutes);





router.use("/teacher", teacherRoutes);

router.use("/Auth", auth);

module.exports = router;
