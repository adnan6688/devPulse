import { Router } from "express";
import { issueController } from "./issue.controller";
import { checkAuth } from "../../middleware/checkAuth";


const route = Router()


route.post('/issues' , checkAuth, issueController.createIssue)


route.get('/issues' , issueController.allIssue)

export const issuesRoute = route