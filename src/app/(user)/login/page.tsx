import { LoginForm } from "@/app/_components/user/login-form";

const LoginPage = () => {
  return (
    <div className='container mx-auto my-10'>
      <header className='text-center mb-10'>
        <h1 className="text-4xl font-extrabold">Welcome Back, Login to Platform!</h1>
      </header>
      <LoginForm />
    </div>
  );
}
 
export default LoginPage;