import { LoginForm } from "@/app/_components/user/login-form";
import { authOptions } from "@/services/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: 'Login | Platform',
  description: 'Login into dashboard of platform application and continue your work.'
}

const LoginPage = async () => {

  return (
    <div className='xl:w-[40%] mx-auto my-24 p-4 rounded-md shadow-md bg-white'>
      <header className='text-center mb-10'>
        <h1 className="text-4xl font-extrabold">Welcome Back, Login to Platform!</h1>
      </header>
      <LoginForm />
    </div>
  );
}
 
export default LoginPage;