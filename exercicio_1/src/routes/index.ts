import { Router } from "express";
import marcasRouter from "./marcas.routes";

const routes = Router()

routes.use('/marcas', marcasRouter)

export default routes