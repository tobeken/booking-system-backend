import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingsRouter from "./routes/booking-route";
dotenv.config()

const app = express();
app.use(express.json())

//middlewares
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingsRouter)

mongoose.connect(
    `mongodb+srv://tobiken:${process.env.MONGODB_PASSWORD}@cluster0.ttayq5q.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => app.listen(5000,()=>
        console.log("connected to DB and Server")
        )
    )
    .catch((e)=>console.log(e));


