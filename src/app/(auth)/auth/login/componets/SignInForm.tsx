'use client'

import { Card } from "../../../../../components/ui/card"
import { FormEvent } from "react"
import { signIn } from "next-auth/react";// useSession
//import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const SignIn = () => {

  // const { data: session, status } = useSession();
  // console.log(session)

 // const router = useRouter();

async function submitHandler(event:FormEvent<HTMLFormElement>){

event.preventDefault();
const formData = new FormData(event.currentTarget);

const loginData = {
  
  id: "kjlkjl",
  email: formData.get('email'),
  password: formData.get('password'),
 redirect: true,//if set ture, midleware will work, if set false response signIn responce will redirect
  callbackUrl:"/user"
}

const response  = await signIn('credentials', loginData);

console.log("in form ",response)

// if(!response?.error){
//   console.log("login--------")
//  if(response?.role === 'admin'){
//   router.push('/admin');
//  } 
//  if(response?.role === 'user'){
//   router.push('/user');
//  } 
// // router.push('/');
// // router.refresh();

// }

}


//console.log("session")

  return (
    
    <Card className="  lg:w-[70%] m-auto p-12" >
   <h1 className="text-md">Login</h1>
    <form onSubmit={submitHandler}>
      <div className="flex w-full flex-col gap-8  my-15 ">

        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col gap-1">
          <label className="label-style">Email</label>
          <input 
          type="email" name="email" id="email"  defaultValue='g@mail.com'
          className="input-style" />
          <p className="text-[0.8rem] font-medium text-destructive">
          
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="label-style">Password</label>
          <input
           type="password" name="password" id="password"  defaultValue='123456'
            className="input-style"
          />

          <p className="text-[0.8rem] font-medium text-destructive">
           
          </p>
        </div>

      
       
        <Button className="form-btn-color" type="submit">Login </Button>
      </div>
    </form>
<div className="w-full text-center mt-5">
If Not register  <Link  href="/auth/register"> click to register</Link>
    </div>
    </Card>



  )
}

export default SignIn