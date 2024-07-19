import { z } from "zod"

export const SignupValidation = z.object({
    
    username: z.string().min(3, {message: 'Too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Must be at least 8 characters'}),

  })

  export const SigninValidation = z.object({
    
    email: z.string().email(),
    password: z.string().min(8, {message: 'Must be at least 8 characters'}),

  })


  export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(10000, { message: "Maximum 100000 caracters" }),
    file: z.custom<File[]>(),
    game: z.string().min(1, { message: "This field is required" }).max(50, { message: "Maximum 50 characters." }),
    
  });