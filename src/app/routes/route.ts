import { Router } from "express";
import { userRoutes } from "../modules/User/users.route";



export const route = Router()


const modulesRoute = [
    {
        path : '/user',
        route : userRoutes
    }
]


modulesRoute.forEach((routeItem)=>{
    route.use(routeItem.path,routeItem.route)
})