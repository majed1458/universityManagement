const express = require("express");
//---------------------------------------------------------
const adminRouter = require("./admin.routes");
const etudiantRoutes = require("./EtudiantRoutes");
const saisonRoutes = require("./Saison.routes");
const evenRoutes = require('./eventRoutes')
const teacherRoutes = require('./enseignant')

const auth = require("./Auth");

//---------------------------------------------------------
const router = express.Router();
//---------------------------------------------------------
router.get("/test", (req, res) => res.send("Working"));
router.use("/admin", adminRouter);
router.use("/Etudiant", etudiantRoutes);
router.use("/Saison", saisonRoutes);
router.use("/Event", evenRoutes);

router.use("/teacher", teacherRoutes);

router.use("/Auth", auth);

module.exports = router;
