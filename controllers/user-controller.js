import User from "../models/User";
import bcryptjs from "bcryptjs";
import Bookings from "../models/Bookings";

export const getAllUsers = async(req,res,next) => {
    let users;
    try{
        users = await User.find();

    }catch(err){
        return console.log(err);
    }
    if(!users){
        return res.status(500).json({message:"unexpected error occured"})
    }
    return res.status(200).json({users});
}


export const signup = async(req,res,next) => {
    const {name,email,password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.send(422).json({message:"Invalid Inputs"});
    }
    const hashedPassword = bcryptjs.hashSync(password);

    let user;
    try{
        user = new User({name,email,password:hashedPassword})
        user = await user.save()
    }
    catch(err){
        return console.log(err);

        }
        if(!user){
            return res.status(500).json({message:"unexpected error occured"})
        }
        return res.status(201).json({id:user._id})
    
}

export const updateUser = async(req,res,next) => {
    const id = req.params.id;
    const {name,email,password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.send(422).json({message:"Invalid Inputs"});
    }
    const hashedPassword = bcryptjs.hashSync(password);

    let user;
    try{
        user = await User.findByIdAndUpdate(id,{name,email,password:hashedPassword})
        

    }
    catch(err){
        return console.log(err)
    }
    if(!user){
        return res.status(500).json({message:"something went wrong"})
    }
    return res.status(200).json({message:"updated sucessfully"})

}

export const deleteUser = async(req,res,next) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndRemove(id);

    }catch(err){
        return console.log(err)
    }
    if(!user){
        return res.status(500).json({message:"something went wrong"})

    }
    return res.status(200).json({message:"delete sucessfully"})
}

export const login = async(req,res,next) => {
    const {email,password} = req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.send(422).json({message:"Invalid Inputs"});
    }
    let existingUser;

    try{
        existingUser = await User.findOne({email});

    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"user not exist"})
    }

    const isPasswordCorrect = bcryptjs.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Password Incorrect"})
    }
    return res.status(200).json({message:"Login successful"})
}

export const getBookingsOfUser = async(req,res,next) => {
const id = req.params.id;
let bookings;

try{
    bookings = await Bookings.find({user:id})
    
}catch(err){
    return console.log(err)
}
if(!bookings){
    return res.status(500).json({message:"unable to get booking"})
}
return res.status(200).json({bookings});
}

export const getUserById = async(req,res,next) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id);

    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"unexpected error occured"})
    }
    return res.status(200).json({user});
}