import zod from "zod"
export const signedUpInput=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
    name:zod.string().optional()
})

export type signedUpInput=zod.infer<typeof signedUpInput>

export const signedInInput=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
})

export type signedInInput=zod.infer<typeof signedInInput>

export const createBlog=zod.object({
    title:zod.string(),
    content:zod.string(),

})
export type createBlog=zod.infer<typeof createBlog>

export const updateBlog=zod.object({
    id:zod.string(),
    title:zod.string(),
    content:zod.string()
})
export type updateBlog=zod.infer<typeof updateBlog>
