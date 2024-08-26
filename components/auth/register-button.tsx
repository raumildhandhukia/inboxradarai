"use client";
import { useRouter } from "next/navigation";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({
  children,
  mode = "redirect",
  asChild,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/register");
  };

  if (mode == "modal") {
    return <span>TODO: Implement Modal</span>;
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
