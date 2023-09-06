import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 404) {
          throw new Error("Username not found");
        } else if (res.status === 400) {
          throw new Error("Invalid password");
        }

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60,
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
