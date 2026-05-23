import { Router } from "express";
import { userRoutes } from "../modules/User/users.route";
import { issuesRoute } from "../modules/Issues/issue.route";

export const mainRouter = Router();

const modulesRoute = [
    {
        path: "/auth",
        route: userRoutes,
    },{
        path : '/issue',
        route : issuesRoute
    }
];

modulesRoute.forEach((r) => {
    mainRouter.use(r.path, r.route);
});