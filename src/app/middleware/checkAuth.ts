import type { NextFunction, Request, Response } from "express";
import { verifyTokens } from "../utils/tokens";
import type { JwtPayload } from "jsonwebtoken";





export const checkAuth = (...authRols: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization || req.headers.authorization?.split(' ')[0]

    if (!token) {
        throw new Error('Token is missing!')
    }

    const user = await verifyTokens(token)
    if (!user) {
        throw new Error("Unauthorized access. Please log in again.");
    }
    const result = user as JwtPayload

    if (!authRols.includes((result.role) as string)) {
        throw new Error(`Permission Denied!`)
    }
    req.user = user as JwtPayload
    next()
}