import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accountId: string;
      username: string;
      role: string;
      token: string;
    };
  }
}
