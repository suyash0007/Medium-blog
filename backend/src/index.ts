import express from 'express'
import userRouter from "./routes/userRouter"
import blogRouter from "./routes/blogRouter"
import blogMiddleware from "./middleware/blogMiddleware"
const bodyParser = require('body-parser');
const app=express()
const port=3000
declare global {
    namespace Express {
      interface Request {
        userId: string;
      }
    }
  }

app.use(bodyParser.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogMiddleware,blogRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})