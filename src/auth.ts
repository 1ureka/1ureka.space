import "server-only";

import { redirect } from "next/navigation";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import type { DefaultSession } from "next-auth";
import type {} from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return false;
      }

      if (JSON.stringify(profile.id) !== process.env.ALLOWED_USER) {
        return false;
      }

      return true;
    },
    jwt({ token, profile }) {
      if (profile) {
        // User is available during sign-in
        token.id = profile.id ?? "";
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id ?? "";
      return session;
    },
  },
});

const validateUserSession = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const expectedUserId = process.env.ALLOWED_USER;

  if (!userId || !expectedUserId || JSON.stringify(userId) !== expectedUserId) {
    redirect("/unAuth");
  }

  return session;
};

export { handlers, signIn, signOut, auth, validateUserSession };
