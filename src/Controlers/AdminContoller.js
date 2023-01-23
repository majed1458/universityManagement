const { User } = require('../models/User')


const createDirecteurStage = async (req, res) => {
    try {

        const foundAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL, role: "Directeur_Stage" })
        if (foundAdmin) {
            res.status(402).json({ msg: "admin already exists" })
        }
        const newAdmin = new User({
            login: process.env.ADMIN_EMAIL,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASS,
            role: "Directeur_Stage"
        })
        const createdAdmin = await newAdmin.save()
        if (!createdAdmin) {
            res.status(400).json({ Message: "Failed to create" });
        }
        res.status(201).json({ Message: "Account successfully created" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}
const createAdministratif = async (req, res) => {
    try {
        const { email, num_tel } = req.body

        const foundAdmin = await User.findOne({ email, role: "Administratif" })
        if (foundAdmin) {
            res.status(402).json({ msg: "administratif already exists" })
        }
        const newAdmin = new User({
            ...req.body,
            login: num_tel,
            password: num_tel,
            role: "Administratif"
        })
        const createdAdmin = await newAdmin.save()
        if (!createdAdmin) {
            res.status(400).json({ Message: "Failed to create" });
        }
        res.status(201).json({ Message: "Account successfully created" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}

const UpdateAdminPermessions = async (req, res) => {
    try {
        const { _id } = req.params;
        const accessFields = []
        const acces = req.body.Acces.forEach(element => {
            accessFields.push({ ...element })

        });
        const updatedAdmin = await User.findOneAndUpdate(
            { _id },
            {
                $set: {
                    access: accessFields
                },
            },
            { new: true }
        )

        if (!updatedAdmin) {
            return res.status(400).json({
                Message: "Failed to update admin",
                Success: false,
            });
        }
        return res
            .status(200)
            .json({ Message: "admin updated successfully", data: updatedAdmin });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};
const getAdmins = async (req, res, next) => {
    try {
        const page = req.query.p || 0;
        const limit = req.query.l || 10;
        const count = (await User.find({ role: "Administratif" })).length;
        const items = await User.find({ role: "Administratif" })
            .skip(page * limit)
            .limit(limit);
        return res.json({
            Message: "Retrived successfully",
            count,
            items,
            offset: page * limit,
            size: items.length,
        });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


module.exports = {
    createDirecteurStage,
    createAdministratif,
    UpdateAdminPermessions,
    getAdmins
}