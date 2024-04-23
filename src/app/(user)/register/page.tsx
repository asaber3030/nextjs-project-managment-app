import { RegisterForm } from "@/app/_components/user/register-form";

const RegisterPage = () => {
  return (
    <div className='container mx-auto my-10'>
      <header className='text-center mb-10'>
        <h1 className="text-4xl font-extrabold">Manage, Organize, Add Projects in our Platform!</h1>
        <p className='text-gray-500 text-xl mt-3'>Best way to do your projects and organize them with Best UI</p>
      </header>
      <RegisterForm />
    </div>
  );
}
 
export default RegisterPage;