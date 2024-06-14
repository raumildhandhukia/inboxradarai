import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  if (session.status === "authenticated") {
    return session.data.user;
  }
  return null;
};
