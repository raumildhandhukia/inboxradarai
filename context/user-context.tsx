import React, { createContext, useEffect, useState } from "react";
import { userInfo } from "@/actions/auth/getUserInfo";
import { setUserPreferences } from "@/actions/auth/setUserPreferences";
import { useSession } from "next-auth/react";
import { UserPreferences } from "@/types";

interface UserContextType {
  user: UserPreferences;
  saveChanges: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

const UserContextDefault: UserContextType = {
  user: {} as UserPreferences,
  saveChanges: () => {},
  setUser: () => {},
};
export const UserContext = createContext(UserContextDefault);
interface UserContextProviderProps {
  children: React.ReactNode;
}
const Context: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserPreferences>({} as UserPreferences);
  const session = useSession();
  const userId = session?.data?.user?.id;

  const saveChanges = () => {
    debugger;
    userId &&
      setUserPreferences({
        id: userId,
        updateSocial: user.updateSocial,
        updatePrimary: user.updatePrimary,
        updatePromotions: user.updatePromotions,
        updateUpdates: user.updateUpdates,
        autoUpdate: user.autoUpdate,
      });
  };
  useEffect(() => {
    const getData = async (userId: string) => {
      const user = await userInfo(userId);
      user &&
        setUser({
          name: user.name || "",
          email: user.email || "",
          plan: user.plan || "FREE",
          updateSocial: user.updateSocial,
          updatePrimary: user.updatePrimary,
          updatePromotions: user.updatePromo,
          updateUpdates: user.updateUpdate,
          autoUpdate: user.autoUpdate,
          emailsProcessed: user.emailProcessed || 0,
          customLabels: user.tags.filter((tag) => !tag.predefinedId) || [],
          predefinedLabels: user.tags.filter((tag) => tag.predefinedId) || [],
          stripeEndDate:
            user.stripeCurrentPeriodEnd?.toLocaleDateString() ||
            new Date().toDateString(),
          lastAutoUpdate: user.lastAutoUpdate || new Date(),
        });
    };
    userId && getData(userId);
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, saveChanges, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
