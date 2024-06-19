import Logo from "@/public/Logo";
import Image from "next/image";

interface HeaderProps {
  position?: "left" | "center" | "right";
}

export const Header: React.FC<HeaderProps> = ({ position }) => {
  if (!position) {
    position = "center";
  }
  return (
    <div className="h-[10vh] md:h-[12vh]">
      <div
        className={`w-full flex flex-col justify-center ${
          position === "left"
            ? "items-start"
            : position === "right"
            ? "items-end"
            : "items-center"
        }`}
      >
        <Logo color="black" className="w-40 md:w-44" />
      </div>
    </div>
  );
};
