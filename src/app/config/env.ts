
import dotenv from 'dotenv'

dotenv.config()


interface EnvConfig {

    PORT: string;
    DB_URL : string;
    PASSWORD_HASH_SALT : string;
    REFRESH_SECRET : string;
    ACCESS_SECRET : string
}


const LoadEnvVariables = (): EnvConfig => {

    const requirdVariable: string[] = [

        "PORT" , 'DB_URL' , 'PASSWORD_HASH_SALT' , 'REFRESH_SECRET' , 'ACCESS_SECRET'
    ]

    requirdVariable?.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variables ${key}`)
        }
    })


    return {
        PORT: process.env.PORT as string,
        DB_URL : process.env.DB_URL as string,
        PASSWORD_HASH_SALT : process.env.PASSWORD_HASH_SALT as string,
        REFRESH_SECRET : process.env.REFRESH_SECRET as string,
        ACCESS_SECRET : process.env.ACCESS_SECRET as string
    }
}

export const envVars = LoadEnvVariables()