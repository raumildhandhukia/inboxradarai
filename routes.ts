/**
 * An array of routes which do not require authentication
 * These routes are accessible to public without authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/about",
  "/blog",
  "/pricing",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/faq",
  "/contact",
  "/api/send-message",
];

/**
 * An array of routes which are used for authentication
 * These routes will redirect logged in users
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/new-verification",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/inbox?type=primary";

/**
 * Webhooks path
 * @type {string}
 */
export const webHooks = "/api/webhooks/stripe";
