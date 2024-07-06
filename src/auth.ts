import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
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
  },
});
