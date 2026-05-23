
import jwt from 'jsonwebtoken'
import { envVars } from '../config/env'

interface TokenPayload {
    id: number,
    role: string,
    email: string
}


export const genereateToken = async (payLoad: TokenPayload) => {

    const createAccesToken = jwt.sign(payLoad, envVars.ACCESS_SECRET as string, { expiresIn: '1d' })

    const refreshToken = jwt.sign(payLoad, envVars.REFRESH_SECRET as string, { expiresIn: '30d' })


    return {
        acccessToken: createAccesToken,
        refreshToken: refreshToken
    }

}

export const verifyTokens = async (token : string)=>{

    const user =  jwt.verify(token,envVars.ACCESS_SECRET)

    return user
}