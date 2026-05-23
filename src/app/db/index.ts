

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
            name  VARCHAR(20) NOT NULL,
            email  VARCHAR(30) NOT NULL UNIQUE,
            password  VARCHAR(100) NOT NULL,
            role  VARCHAR(15) DEFAULT 'contributor' CHECK (role IN ('contributor','maintainer')),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at  TIMESTAMP DEFAULT NOW()
            )  
            `)
        console.log("Users table created!")

        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(
        
            id SERIAL PRIMARY KEY,
            title  VARCHAR(150) NOT NULL,
            description TEXT CHECK(LENGTH(description) >= 20),
            type VARCHAR(20) NOT NULL CHECK (type IN ('bug','feature_request')),
            status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved')) ,
            reporter_id INTEGER  NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            
            )  
            `)
            console.log('issues table created!')
    }
    catch (err) {
        console.log(err)
    }
}