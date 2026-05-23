import { Router } from "express";
import { userController } from "./users.controller";




const route = Router()

route.post('/signup' , userController.userCreate)
route.post('/login' , userController.loginUser)

export const userRoutes = route