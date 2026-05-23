import { Router } from "express";
import { issueController } from "./issue.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { IRole } from "../User/users.interface";


const route = Router()


route.post('/issues', checkAuth(IRole.contributor), issueController.createIssue)


route.get('/issues', issueController.allIssue)

route.get('/issues/:id', issueController.singleIssue)

route.patch('/issues/:id', checkAuth(...Object.values(IRole)), issueController.updateIssue)

route.delete('/issues/:id', checkAuth(IRole.maintainer), issueController.deleteIssue)

export const issuesRoute = route