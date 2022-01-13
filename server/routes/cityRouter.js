import { Router } from "express";
import { getCities, createCity } from "../controllers/cityControllers.js";


const cityRouter = Router()

cityRouter.get( "/", getCities )

cityRouter.post("/", createCity )

export default cityRouter;