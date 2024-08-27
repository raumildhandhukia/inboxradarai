import { LoginForm } from "@/components/auth/login-form";
import { Social } from "@/components/auth/social";
import Logo from "@/public/Logo";
import { Suspense } from "react";
const LoginPage = () => {
  return (
    <Suspense>
      <div className="flex flex-col gap-5 items-center">
        {/* <Logo color="black" className="w-64" /> */}
        <Social />
      </div>
    </Suspense>
  );
};
export default LoginPage;
