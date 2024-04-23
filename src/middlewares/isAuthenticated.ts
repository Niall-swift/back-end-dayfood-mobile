import {NextFunction, Request, Response} from 'express'
import {verify} from 'jsonwebtoken'

interface payload{
    sub: string;
}

export function isAuthenticated(
    req: Request, 
    res: Response, 
    next: NextFunction)
    {
    ///receber o token
    const authtoken = req.headers.authorization;

    if(!authtoken){
        return res.status(401).end()
    }

    /// asqui eu usei o split para  pegar somento o token
    const [, token] = authtoken.split(" ")

    try{
        /// aqui eu estou validando o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as payload;

        /// recuperar o id do token e colocar dentrro de uma variavel user_id dentro do req:Request
        req.user_id = sub;
        
        return next();

    }catch(err){

        return res.status(401).end()
    }
}