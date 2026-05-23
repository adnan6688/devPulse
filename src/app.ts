

import express, { type NextFunction, type Request, type Response } from 'express'
import { mainRouter } from './app/routes/route'

const app = express()


app.use(express.json())

app.use('/api', mainRouter)



app.get('/', (req: Request, res: Response) => {

    res.json({
        success: true,
        message: 'Devplus server is running!'
    })
})


app.use((err: any, req: Request, res: Response, next: NextFunction) => {

    res.status(500).json({
        success: false,
        message: err.message,
        errors: err
    });
});


export default app