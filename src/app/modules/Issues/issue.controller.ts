import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { issueService } from "./issue.service";


const createIssue = async (req: Request, res: Response) => {


    const reporter_id =await req.user.id

    const result = await issueService.issueCrate(req.body, reporter_id)

    console.log(result)
    sendResponse(res, {
        success: true,
        message: 'Issue created successfully!',
        statusCode: status.OK,
        data : result
    })
}


const allIssue = async (req : Request , res : Response)=>{

    const data = await issueService.allIssue()


    sendResponse(res, {
        success : true,
        message : 'All issues list',
        data : data,
        statusCode : status.OK
    })
}
export const issueController = {
    createIssue,
    allIssue
}