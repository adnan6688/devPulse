import type { Response, Request } from "express";
import { userService } from "./users.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from 'http-status'
import { genereateToken } from "../../utils/tokens";

const userCreate = async (req: Request, res: Response) => {



    const ans = await userService.userCreate(req.body)

    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: statusCode.CREATED,
        data: ans
    })
}


const loginUser = async (req: Request, res: Response) => {


    const result = await userService.loginUser(req.body)

    const tokenPayload = {
        id: result.id,
        email: result.email,
        role: result.role
    }


    const tokens = await genereateToken(tokenPayload)


    sendResponse(res, {
        success: true,
        message: 'Login successfully!',
        statusCode: statusCode.OK,
        data: {
            token: tokens.acccessToken,
            user: result
        }

    })
}
export const userController = {
    userCreate,
    loginUser
}