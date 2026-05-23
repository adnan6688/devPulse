import { pool } from "../../db";
import type { Tissue } from "./issue.interface";


const issueCrate = async (payload: Partial<Tissue>, reporter_id: number) => {

    const { title, description, type } = payload

    if (!type) {
        throw new Error('Type not found!')
    }
    const ckReporter = await pool.query(`
        
        SELECT * FROM  users
        WHERE id=$1
        
        `, [reporter_id])

    if (!ckReporter.rowCount) {
        throw new Error('Reporter not found!')
    }

    const query = `
  INSERT INTO issues(title, description, type, reporter_id)
  VALUES($1, $2, $3, $4)
  RETURNING *;
`;

    const values = [title, description, type, reporter_id];

    const inserIssue = await pool.query(query, values);


    if (inserIssue.rowCount) {
        return inserIssue.rows[0]
    }

    return null
}


const allIssue = async () => {

    const data = await pool.query(`
        
        SELECT * FROM issues
        
        `)

    return data?.rows || []
}

export const issueService = {
    issueCrate,
    allIssue
}