
import dotenv from 'dotenv'

dotenv.config()


interface EnvConfig {

    PORT: string;
    DB_URL : string;
    PASSWORD_HASH_SALT : string
}


const LoadEnvVariables = (): EnvConfig => {

    const requirdVariable: string[] = [

        "PORT" , 'DB_URL' , 'PASSWORD_HASH_SALT'
    ]

    requirdVariable?.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variables ${key}`)
        }
    })


    return {
        PORT: process.env.PORT as string,
        DB_URL : process.env.DB_URL as string,
        PASSWORD_HASH_SALT : process.env.PASSWORD_HASH_SALT as string
    }
}

export const envVars = LoadEnvVariables()