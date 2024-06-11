import Image from "next/image";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="h-[10vh] md:h-[12vh]">
      <div className="w-full flex flex-col items-center justify-center">
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
