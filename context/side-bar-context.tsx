import { createContext, useState } from "react";

interface SideBarItemContextType {
  activeItem: String;
  setActiveItem: React.Dispatch<React.SetStateAction<String>>;
}

const defaultContext: SideBarItemContextType = {
  activeItem: "Home",
  setActiveItem: () => {},
};

export const SideBarItemContext = createContext(defaultContext);

interface SideBarItemContextProviderProps {
  children: React.ReactNode;
}

const Context: React.FC<SideBarItemContextProviderProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState<String>("Primary");
  return (
    <SideBarItemContext.Provider
      value={{
        activeItem,
        setActiveItem,
      }}
    >
      {children}
    </SideBarItemContext.Provider>
  );
};

export default Context;
