import Express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors'
import { router } from './routes';
import path from 'path'

const app = Express();
app.use(Express.json());
app.use(cors())

app.use(router);

app.use(
    '/files',
    Express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof Error) {

        return res.status(400).json({
            error: err.message

        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'tenal server error'
    })

})

app.listen(3333, () => console.log("Olá, gay"))