import Image from "next/image";

interface HeaderProps {
  label: string;
}

export const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <div className="h-[20vh]">
      <div className="w-full flex flex-col items-center justify-center relative">
        <Image
          className="absolute -top-24"
          src="/logo.svg"
          alt="logo"
          width={250}
          height={1}
        />

        <p className="ThemeText text-2xl absolute top-24">{label}</p>
      </div>
    </div>
  );
};
