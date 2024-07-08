import NextAuth, { type DefaultSession } from "next-auth";
import type {} from "next-auth/jwt";
import GitHub from "next-auth/providers/github";

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

export const { handlers, signIn, signOut, auth } = NextAuth({
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
