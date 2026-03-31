import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: number;
    name: string;
    username: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    username?: string;
    accessToken?: string;
  }
}
