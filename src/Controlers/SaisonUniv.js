const Saison_Univer = require("../models/Saison_Universitaire");


const createSaison = async (req, res, next) => {
    try {
        const { année_debut, année_fin } = req.body
        if ((année_fin - année_debut) !== 1) {
            res.status(302).json({ msg: "put vald years" })
        }
        const newSaison = new Saison_Univer({ annee_univ: `${année_debut}-${année_fin}` })
        await newSaison.save()
        res.status(201).json({ Message: "season successfully created" });
    } catch (err) {
        console.log("##########:", error);
        res.status(500).send({ Message: error._message, Error: error.message });
    }
}

module.exports={
    createSaison
}