import { useCurrentUser } from "./useCurrentUser";
import { sidebarItems } from "@/data";

export const useUserCategories = () => {
  return sidebarItems.map((item) => item.text.toLowerCase());
};
