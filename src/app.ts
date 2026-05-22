

import express from 'express'
import { route } from './app/routes/route'
const app = express()


app.use(express.json())

app.use('api/v1',route)

export default app