import React, { createContext, useEffect, useState } from "react";
import { userInfo } from "@/actions/auth/getUserInfo";
import { setUserPreferences } from "@/actions/auth/setUserPreferences";
import { useSession } from "next-auth/react";
import { UserPreferences } from "@/types";
import { getUserPlan } from "@/actions/plan";

interface UserContextType {
  user: UserPreferences;
  saveChanges: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserPreferences>>;
  refreshUser: () => void;
  refresh: boolean;
}

const UserContextDefault: UserContextType = {
  user: {} as UserPreferences,
  saveChanges: () => {},
  setUser: () => {},
  refreshUser: () => {},
  refresh: true,
};
export const UserContext = createContext(UserContextDefault);
interface UserContextProviderProps {
  children: React.ReactNode;
}
const Context: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserPreferences>({} as UserPreferences);
  const [refresh, setRefresh] = useState(true);
  const session = useSession();
  const userId = session?.data?.user?.id;

  const refreshUser = async () => {
    if (!userId) {
      return;
    }
    await getData(userId);
  };

  const saveChanges = () => {
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
  const getData = async (userId: string) => {
    const user = await userInfo(userId);
    const res = await getUserPlan();
    const plan = res?.plan;
    if (!plan) {
      return;
    }

    user &&
      setUser({
        name: user.name || "",
        email: user.email || "",
        plan: plan?.plan || "FREE",
        updateSocial: user.updateSocial,
        updatePrimary: user.updatePrimary,
        updatePromotions: user.updatePromo,
        updateUpdates: user.updateUpdate,
        autoUpdate: user.autoUpdate,
        // autoUpdate: user.autoUpdate && plan?.autoProcess,
        emailsProcessed: user.emailProcessed || 0,
        labels: user.tags || [],
        customLabels: user.tags.filter((tag) => !tag.predefinedId) || [],
        predefinedLabels: user.tags.filter((tag) => tag.predefinedId) || [],
        stripeEndDate:
          user.stripeCurrentPeriodEnd?.toLocaleDateString() ||
          new Date().toDateString(),
        lastAutoUpdate: user.lastAutoUpdate || new Date(),
        hasPlanCancelled: user.changeToFreePlanOnPeriodEnd || false,
        planEndingDate: user.stripeCurrentPeriodEnd || null,
      });
  };
  useEffect(() => {
    if (userId && refresh) {
      getData(userId);
      setRefresh(false);
    }
  }, [userId, refresh]);

  return (
    <UserContext.Provider
      value={{ user, saveChanges, setUser, refresh, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
