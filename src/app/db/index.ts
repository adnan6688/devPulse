

import { Pool } from "pg";
import { envVars } from "../config/env";



export const pool = new Pool({
    connectionString: envVars.DB_URL
})


export const initDB = async () => {


    console.log("db creating....")

    try {

        await pool.query(`
            CREATE TABLE  IF NOT EXISTS  users(
            
            id SERIAL PRIMARY KEY,
            name  VARCHAR(20),
            email  VARCHAR(20) NOT NULL UNIQUE,
            password  VARCHAR(10) NOT NULL,
            role  VARCHAR(10) DEFAULT 'contributor',
            
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at  TIMESTAMP DEFAULT NOW()
            )
            
            `)
        console.log("Users table created!")
    }
    catch (err) {
        console.log(err)
    }
}