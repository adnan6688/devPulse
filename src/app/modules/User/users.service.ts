import { envVars } from "../../config/env";
import { pool } from "../../db";
import { IRole, type Iusers } from "./users.interface";
import bcrypt from 'bcrypt'


const userCreate = async (payload: Partial<Iusers>) => {

    const { email, password, role, name } = payload
    if (!email || !password || !name) {
        throw new Error('Email , password and name All fields are required!')
    }
   

    const hashPass = bcrypt.hash(password as string, Number(envVars.PASSWORD_HASH_SALT))

    const user = await pool.query(`
        
        INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) 
        
        `, [name, email, hashPass, role || IRole.contributor])

    console.log(user, "users")

    return user

}

export const userService = {
    userCreate
}