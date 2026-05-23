import { envVars } from "../../config/env";
import { pool } from "../../db";
import { IRole, type Iusers } from "./users.interface";
import bcrypt from 'bcrypt'


const userCreate = async (payload: Partial<Iusers>) => {

    const { email, password, role, name } = payload
    if (!email || !password || !name) {
        throw new Error('Email , password and name All fields are required!')
    }

    // ck user 

    const ckUser = await pool.query(
        `
  SELECT * FROM users
  WHERE email = $1
  `,
        [email]
    );
    if (ckUser.rowCount) {

        throw new Error('This user already exits!')
    }



    const hashPass = await bcrypt.hash(password as string, Number(envVars.PASSWORD_HASH_SALT))
    const user = await pool.query(`
        
        INSERT INTO users(name,email,password,role) 
        
        VALUES($1,$2,$3,$4) 
        
        RETURNING *
        `, [name, email, hashPass, role || IRole.contributor])

    if (user.rowCount) {
        return user.rows[0]
    }
    return null
}


const loginUser = async (payload: { email: string, password: string }) => {


    const { email, password } = payload
    if (!email || !password) {
        throw new Error('Email and password must be added!')
    }
    const ckUser = await pool.query(`
        SELECT *  FROM users
        WHERE email=$1
        `, [email])


    if (!ckUser.rowCount) {
        throw new Error('User not found!')
    }
    const compare = await bcrypt.compare(password, ckUser.rows[0].password)
    if (!compare) {
        throw new Error('Password Does nót match!')
    }

    return ckUser.rows[0] || {}

}

export const userService = {
    userCreate,
    loginUser
}