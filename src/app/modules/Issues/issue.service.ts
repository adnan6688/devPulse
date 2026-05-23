


import { pool } from "../../db";
import { IRole } from "../User/users.interface";
import { IssuStatus, type Tissue } from "./issue.interface";


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


const allIssue = async (query: Record<string, string>) => {


    const sortedData = query.sort == 'newst' ? 'DESC' : 'ASC'


    let sqlQuery = `
    SELECT * FROM issues
    `

    let typeStore = []
    if (query.type && query.status) {
        sqlQuery += `WHERE type=$1 AND status=$2 `
        typeStore.push(query.type, query.status)
    }
    else if (query.status) {
        sqlQuery += `WHERE status=$1 `
        typeStore.push(query.status)
    }
    else if (query.type) {
        sqlQuery += `WHERE type=$1 `
        typeStore.push(query.type)
    }

    sqlQuery += `ORDER BY id ${sortedData}`


    const data = await pool.query(sqlQuery, typeStore)

    const ans = await Promise.all(

        data.rows.map(async (item) => {

            const repoterDetails = await pool.query(`
            SELECT * FROM users
            WHERE id = $1
        `, [item.reporter_id])

            const reporter = repoterDetails.rows[0]

            item.reporter_id = {
                id: reporter.id,
                name: reporter.name,
                role: reporter.role
            }

            return item
        })

    )
    return ans || []
}


const issueDetails = async (id: number) => {


    const qery = await pool.query(`
        
        SELECT * FROM  issues

        WHERE id=$1
        
        `, [id])
    let deilats = qery.rows[0]

    if (!deilats) {
        throw new Error('Issue not found!')
    }
    const repoter = await pool.query(`
            
            SELECT * FROM  users

            WHERE id=$1
            
            `, [qery.rows[0].reporter_id])

    if (!repoter.rowCount) {
        throw new Error('Repoter not found!')
    }


    deilats.reporter_id = {
        id: repoter.rows[0].id,
        name: repoter.rows[0].name,
        role: repoter.rows[0].role
    }



    return deilats
}

const updateIssue = async (payload: Partial<Tissue>, id: number, role: string, userId: number) => {

    const ckIssue = await pool.query(`
        SELECT * FROM issues
        WHERE id = $1
    `, [id])

    const issue = ckIssue.rows[0]

    if (!issue) {
        throw new Error('Issue not found')
    }

    const { title, description, type, status } = payload

    if (role === IRole.contributor) {

        if (issue.reporter_id !== userId) {
            throw new Error('Not allowed')
        }

        if (issue.status !== IssuStatus.open) {
            throw new Error('Can not update, already status changed')
        }

        const ans = await pool.query(`
            UPDATE issues
            SET title = COALESCE($1,title),
                description = COALESCE($2,description),
                type = COALESCE($3,type),
                status = COALESCE($4,status)
            WHERE id = $5

            RETURNING *
        `, [title, description, type, status, id])


        return ans.rowCount ? ans.rows[0] : 'not update'

    }

    const ans = await pool.query(`
            UPDATE issues
            SET title = COALESCE($1,title),
                description = COALESCE($2,description),
                type = COALESCE($3,type)
                status = COALESCE($4,status)
            WHERE id = $5

            RETURNING *
        `, [title, description, type, status, id])


    return ans.rowCount ? ans.rows[0] : 'not update'
}


const deleteIssue = async (id: number) => {

    const qery = await pool.query(`
        
        SELECT * FROM  issues

        WHERE id=$1
        
        `, [id])
    let deilats = qery.rows[0]
    if (!deilats) {
        throw new Error('Issue not found!')
    }

    const ans = await pool.query(`
        
        DELETE FROM issues

        WHERE id=$1
        
        
        `, [id])

    return ans.rowCount ? 'Issue deleted successfully' : 'Not delete'
}

export const issueService = {
    issueCrate,
    allIssue,
    issueDetails,
    updateIssue,
    deleteIssue
}