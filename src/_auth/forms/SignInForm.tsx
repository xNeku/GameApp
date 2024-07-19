import * as z  from "zod"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"

import {  useToast } from "@/components/ui/use-toast"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"

import { useUserContext } from "@/context/AuthContext"





const SignInForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();
  
  
 
   
  //Query
  const { mutateAsync: signInAccount} = useSignInAccount();
   
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:'',
      password:'',
    },
  })


  
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
   
  const session = await signInAccount({
    email: values.email,
    password: values.password,

  })
  if(!session) {
    return toast({title: 'Sign in failed. Please try again.'})
  }

  const isLoggedIn = await checkAuthUser();


  if(isLoggedIn) {
    form.reset();

    navigate('/')
  } else {
    return toast({title: 'Sign up failed. Please try again'})
  }
}
  return (
    
      <Form {...form}>
        {/*Parte de arriba del form de Registro*/}
        <div className="sm:w-420 flex-center flex-col">
        <div className="sm:w-420 flex-center">
          <img src="/assets/images/principal-logo.png" alt="logo"  width={50}  />
          <img src="/assets/images/principal-logo.png" alt="logo"  width={50}  />
          <img src="/assets/images/principal-logo.png" alt="logo"  width={50}  />
          </div>
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Welcome back Player</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Enter your details!
            </p>        
        

        {/*Form de Registro*/}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        
       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary ">
          {isUserLoading ? (
            <div className="flex-center gap-2">
             <Loader/> Loading..
            </div>
          ): "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2 ">
          New Here?
          <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">
          Sign Up 
          </Link>
          </p>
      </form>
      </div>
    </Form>
   
  )
}

export default SignInForm