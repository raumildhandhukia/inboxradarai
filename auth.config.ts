import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface YahooEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "public" | "private";
}

interface YahooProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

/**
 * Add GitHub login to your page and make requests to [GitHub APIs](https://docs.github.com/en/rest).
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/github
 * ```
 *
 * #### Configuration
 * ```ts
 * import { Auth } from "@auth/core"
 * import GitHub from "@auth/core/providers/github"
 *
 * const request = new Request(origin)
 * const response = await Auth(request, {
 *   providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
 * })
 * ```
 *
 * ### Resources
 *
 * - [GitHub - Creating an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
 * - [GitHub - Authorizing OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
 * - [GitHub - Configure your GitHub OAuth Apps](https://github.com/settings/developers)
 * - [Learn more about OAuth](https://authjs.dev/concepts/oauth)
 * - [Source code](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts)
 *
 * ### Notes
 *
 * By default, Auth.js assumes that the GitHub provider is
 * based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.
 *
 * :::tip
 *
 * The GitHub provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */
function Yahoo(config: any): OAuthConfig<YahooProfile> {
  return {
    id: "yahoo",
    name: "Yahoo",
    clientId: process.env.AUTH_YAHOO_CLIENT_ID,
    clientSecret: process.env.AUTH_YAHOO_SECRET,
    type: "oauth",
    authorization: {
      url: `https://api.login.yahoo.com/oauth2/request_auth`,
      params: { scope: "read:user user:email" },
    },
    token: `https://api.login.yahoo.com/oauth2/get_token`,
    userinfo: {
      url: `https://api.clickup.com/api/v2/user`,
      async request({ tokens, provider }: { tokens: any; provider: any }) {
        const profile = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "User-Agent": "authjs",
          },
        }).then(async (res) => await res.json());

        // if (!profile.email) {
        //   // If the user does not have a public email, get another via the GitHub API
        //   // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
        //   const res = await fetch(`${apiBaseUrl}/user/emails`, {
        //     headers: {
        //       Authorization: `Bearer ${tokens.access_token}`,
        //       "User-Agent": "authjs",
        //     },
        //   });

        //   if (res.ok) {
        //     const emails: YahooEmail[] = await res.json();
        //     profile.email = (emails.find((e) => e.primary) ?? emails[0]).email;
        //   }
        // }

        return profile;
      },
    },
    profile(profile) {
      return {
        id: profile.sub.toString(),
        name: profile.name as string,
        email: profile.email,
        image: profile.picture as string,
      };
    },
    style: { bg: "#24292f", text: "#fff" },
  };
}

// const Yahoo: OAuthConfig<any> = {
//   id: "yahoo",
//   name: "Yahoo Mail",
//   type: "oauth",
//   authorization: "https://api.login.yahoo.com/oauth2/request_auth",
//   token: "https://api.login.yahoo.com/oauth2/get_token",
//   userinfo: "https://api.clickup.com/api/v2/user",
//   clientId: process.env.AUTH_YAHOO_CLIENT_ID,
//   clientSecret: process.env.AUTH_YAHOO_SECRET,
//   checks: ["state"],
//   profile: (profile: any) => {
//     console.log("profile", profile);
//     return {
//       id: profile.user.sub.toString(),
//       name: profile.user.name,
//       email: profile.user.email,
//       image: profile.user.picture,
//     };
//   },
// };

export default { providers: [Google, Yahoo] } satisfies NextAuthConfig;
