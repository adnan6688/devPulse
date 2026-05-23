import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { issueService } from "./issue.service";
import type { JwtPayload } from "jsonwebtoken";


const createIssue = async (req: Request, res: Response) => {


    const reporter_id = await req.user.id

    const result = await issueService.issueCrate(req.body, reporter_id)

    sendResponse(res, {
        success: true,
        message: 'Issue created successfully!',
        statusCode: status.OK,
        data: result
    })
}


const allIssue = async (req: Request, res: Response) => {



    const query = req.query as Record<string, string>

    const data = await issueService.allIssue(query)


    sendResponse(res, {
        success: true,
        message: 'Issues retrived successfully',
        data: data,
        statusCode: status.OK
    })
}

const singleIssue = async (req: Request, res: Response) => {

    const id = Number(req.params.id)
    if (!id) {
        throw new Error('Issue id not found!')
    }

    const data = await issueService.issueDetails(id)

    sendResponse(res, {
        success: true,
        data: data,
        message: 'Issue retrived successfully',
        statusCode: status.OK
    })
}


const updateIssue = async (req: Request, res: Response) => {

    const user = req.user as JwtPayload
    const role = user.role

    const id = req.params.id

    const body = req.body

    const result = await issueService.updateIssue(body, Number(id), role, user.id)


    console.log(result)

    sendResponse(res, {
        success: true,
        message: 'Issue updated successfully',
        data: result,
        statusCode: status.OK
    })
}

const deleteIssue = async (req: Request, res: Response) => {


    const id = req.params.id
    await issueService.deleteIssue(Number(id))

    sendResponse(res, {
        success: true,
        message: 'Issue deleted successfully',
        statusCode: status.OK
    })
}

export const issueController = {
    createIssue,
    allIssue,
    singleIssue,
    updateIssue,
    deleteIssue
}