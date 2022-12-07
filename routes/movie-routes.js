import express from "express"
import { addMovie, getAllMovies, getMovieById } from "../controllers/movie-controller";



const movieRouter = express.Router();

movieRouter.get("/",getAllMovies)
movieRouter.post("/",addMovie);
movieRouter.get("/:id",getMovieById)


export default movieRouter;