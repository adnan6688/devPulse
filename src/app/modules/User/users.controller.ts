import type { Response } from "express";
import { userService } from "./users.service";


const userCreate = async (req: Request, res: Response) => {


    const ans = await userService.userCreate(req.body as any)

    

}