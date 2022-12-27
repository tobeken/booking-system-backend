import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";

export const newBooking = async(req,res,next) => {
    const{movie,date,seatNumber,user} = req.body;

    let existingMovie;
    let existingUser;

    try{
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err)
    }
    if(!existingMovie){
        return res.status(404).json({message:"Movie Not Found with given id"})
    }
    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    let booking;

    try{
        booking = new Bookings({
            movie,
            date:new Date(`${date}`), 
            seatNumber, 
            user,
        })


        const session =  await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.booking.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();

    }catch(err){
        return console.log(err)
    }
    if(!booking){
        return res.status(500).json({message:"unable to create booking"})
    }

    return res.status(201).json({booking})

}

export const getBookingById = async(req,res,next) => {
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.findById(id)

    }catch(err){
        console.log(err)
    }
    if(!booking){
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(200).json({booking})
}

export const deleteBooking = async(req,res,next) => {
    const id =req.params.id;
    let booking;
    try{
        booking = await Bookings.findByIdAndRemove(id).populate("user movie")
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking)
        await booking.movie.bookings.pull(booking)
        await booking.movie.save({session})
        await booking.user.save({session})
        session.commitTransaction();

    }catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"Success delete"})
}