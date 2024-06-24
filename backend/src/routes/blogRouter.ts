import express,{Router} from 'express'
import { PrismaClient } from '@prisma/client'
const app=express()
const router=Router()
const prisma=new PrismaClient()

router.post('/',async(req,res)=>{
    try{
        const blog=await prisma.post.create({
            data:{
                title:req.body.title,
                content:req.body.content,
                authorId:req.userId
            }
        })
        res.json({
            id:blog.id
        })

    }
    catch(err){
        return res.json({
            msg:"somthing went wrong"
        })
    }
    
    
    
})
router.put('/',async(req,res)=>{
    try{
        const blog=await prisma.post.update({
            where:{
                id:req.body.id
            },
            data:{
                title:req.body.title,
                content:req.body.content
            }
        })
        return res.json({
            id:blog.id
        })
    }
    catch(err){
        return res.json({
            msg:"somthing went wrong"
        })
    }
    
})
router.get('/bulk',async(req,res)=>{
    const blogs=await prisma.post.findMany()
    return res.json({
        blogs
    })
            
})


router.get('/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const blog=await prisma.post.findFirst({
            where:{
                id:id
            }
        })
        return res.json({
            blog
        })

    }catch(err){
        return res.json({
            msg:"somthing went wrong"
        })
    }
    
})

export default router