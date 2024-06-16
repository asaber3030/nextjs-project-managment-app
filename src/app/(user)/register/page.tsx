import { getPlanById } from "@/actions/app";
import { RegisterForm } from "@/app/_components/user/register-form";
import { Plan } from "@/types";

const RegisterPage = async () => {
  const plan = await getPlanById(1);
  return (
    <RegisterForm plan={plan as Plan} />
  );
}
 
export default RegisterPage;