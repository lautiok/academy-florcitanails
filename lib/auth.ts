// /auth.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuth from "next-auth";


export const { auth } = NextAuth(authOptions);
