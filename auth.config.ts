import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import {
  storeAccountData,
  // upsertInbox
} from "@/actions/auth/account";
import { populateUser } from "@/actions/auth/populateUser";
import { db } from "@/lib/db";
import { userInfo } from "./actions/auth/getUserInfo";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";

export default {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async createUser({ user }) {},
    async linkAccount({ user }) {
      const dbUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });
      if (dbUser && dbUser.email && !dbUser?.emailVerified) {
        try {
          await populateUser(dbUser.id, dbUser.email);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async signIn(incoming) {
      const { account, profile, user } = incoming;
      if (
        account?.provider === "google" &&
        account?.access_token &&
        account?.refresh_token &&
        profile?.email
      ) {
        await storeAccountData(
          account.refresh_token,
          account.providerAccountId,
          profile.email || ""
        );
      }
    },
  },
  callbacks: {
    // async signIn(incoming) {
    //   const { account, profile, user } = incoming;
    //   if (
    //     account?.provider === "google" &&
    //     account?.access_token &&
    //     account?.refresh_token &&
    //     profile?.email
    //   ) {
    //     await storeAccountData(
    //       account.refresh_token,
    //       account.providerAccountId,
    //       profile.email || ""
    //     );
    //     // await upsertInbox(account.refresh_token, "google", user.email);
    //   }

    //   return true;
    // },
    async session({ session, token }) {
      if (session && token && session.user && token.sub) {
        const user = await userInfo(token.sub);
        session.user.id = token.sub;
        session.user.stripePriceId = user?.stripePriceId || "";
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !password) {
            return null;
          } else {
            const isValid = await bcrypt.compare(password, user.password!);
            if (!isValid) {
              return null;
            }
            return user;
          }
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
          scope:
            "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify",
        },
      },
    }),
    {
      id: "yahoo", // signIn("my-provider") and will be part of the callback URL
      name: "Yahoo", // optional, used on the default login page as the button text.
      type: "oauth", // or "oauth" for OAuth 2 providers
      issuer: "https://api.login.yahoo.com", // to infer the .well-known/openid-configuration URL
      clientId: process.env.AUTH_YAHOO_CLIENT_ID, // from the provider's dashboard
      clientSecret: process.env.AUTH_YAHOO_SECRET, // from the provider's dashboard
      userinfo: "https://api.login.yahoo.com/openid/v1/userinfo", // URL to fetch the user profile
      token: "https://api.login.yahoo.com/oauth2/get_token", // URL to get an access token
    },
  ],
} satisfies NextAuthConfig;
