import { LoginForm } from "@/components/auth/login-form";
import { Social } from "@/components/auth/social";
import DotPattern from "@/components/ui/dot";
import GridPattern from "@/components/ui/grid";
import { cn } from "@/lib/utils";
import Logo from "@/public/Logo";
import { Suspense } from "react";
const LoginPage = () => {
  return (
    <Suspense>
      <div className="flex flex-col gap-5 items-center ">
        <GridPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
          )}
        />
        <DotPattern
          width={20}
          height={20}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
          )}
        />

        {/* <Logo color="black" className="w-64" /> */}
        <Social />
      </div>
    </Suspense>
  );
};
export default LoginPage;
