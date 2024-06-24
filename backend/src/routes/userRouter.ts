import express,{Router} from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import 'dotenv/config';
const app=express()
const router=Router()
const prisma=new PrismaClient()
app.use(express.json())
router.post('/signup',async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    try{
        const user=await prisma.user.create({
            data:{
                email,
                password
            }
        })
        const token= await jwt.sign({id:user.id},process.env.JWT_SECRET as string)
        return res.json({
            jwt:token
        })
    }
    catch(err){
       return res.json({
            msg:"something went wrong, try again"
        })
    }

})
router.post('/signin',async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const exsistingUser=await prisma.user.findUnique({
        where:{
            email:email,
            password:password
        }
    })

if(!exsistingUser){
    return res.json({
        msg:"User doesnt exsist"
    })
}
const token=await jwt.sign({id:exsistingUser.id},process.env.JWT_SECRET as string)
return res.json({jwt:token})
    
})

export default router