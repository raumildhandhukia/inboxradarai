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
        <Image
          className="w-40 md:w-44"
          src="/logo.svg"
          alt="logo"
          width={1} // why vercel? why? atleast stop giving me an error !!!
          height={1} // why vercel? why? atleast stop giving me an error !!!
        />
      </div>
    </div>
  );
};
