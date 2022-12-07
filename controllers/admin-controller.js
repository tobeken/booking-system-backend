import Admin from "../models/Admin";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const addAdmin = async(req,res,next) =>{
    const {email,password} =req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.send(422).json({message:"Invalid Inputs"});
    }

    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email});
    }catch(err){
        return console.log(err)
    }
    if(existingAdmin){
        return res.send(400).json({message:"Admin already existing"})
    }

    let admin;

    const hashedPassword = bcryptjs.hashSync(password)
    try{
        admin = new Admin({email,password:hashedPassword});
        admin = await admin.save();

    }
    catch(err){
        return console.log(err)
    }
    if(!admin){
        return res.send(500).json({message:"unable to store admin"})
    }
    return res.status(201).json({admin})
} 

export const adminLogin = async(req,res,next) => {
    const {email,password} =req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.send(422).json({message:"Invalid Inputs"});
    }
    let existingAdmin;
    try{ existingAdmin = await Admin.findOne({email})

    }catch(err){
        return console.log(err)
    }
    if(!existingAdmin){
        return res.status(400).json({message:"Admin not found"})
    }

    const isPasswordCorrect =bcryptjs.compareSync(password,existingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"});
    }

    const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
        expiresIn:"7d",
    });

    return res.status(200).json({message:"Authentication Complete",token,id:existingAdmin._id});

}