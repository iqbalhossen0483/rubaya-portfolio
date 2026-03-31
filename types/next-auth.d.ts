import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: number;
    name: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    accessToken?: string;
  }
}
