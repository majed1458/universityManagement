const {User}=require('../models/User')


const createAdmin = async(req,res)=>{
    try{

        const foundAdmin = await User.findOne({email:process.env.ADMIN_EMAIL,role:"Directeur_Stage"})
        if(foundAdmin){
            res.status(402).json({msg:"admin already exists"})
        }
        const newAdmin = new User({
            email:process.env.ADMIN_EMAIL,
            password:process.env.ADMIN_PASS,
            role:"Directeur_Stage"
        })
       const createdAdmin= await newAdmin.save()
       if (!createdAdmin) {
         res.status(400).json({ Message: "Failed to create" });
      }
       res.status(201).json({ Message: "Account successfully created" });
    }catch(error){
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}

module.exports ={
    createAdmin
}