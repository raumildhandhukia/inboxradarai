import { cn } from "@/lib/utils";
const FancyButton = ({
  submit,
  onClick,
  children,
  className,
}: {
  submit?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <button type={submit ? "submit" : "button"} onClick={onClick}>
    <div>{children}</div>
  </button>
);
export default FancyButton;
