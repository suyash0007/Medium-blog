import express, { NextFunction,Request,Response } from 'express'
import userRouter from '../routes/userRouter'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config';
const app=express()
async function blogMiddleware(req:Request,res:Response,next:NextFunction){
    const token= req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'No authorization header found' });
    }
    const validate=await jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
    if(validate.id){
        req.userId=validate.id
        next()

    }
    else{
        return res.status(403).json({
            err:"unauthorized"
        })
    }

}
export default blogMiddleware