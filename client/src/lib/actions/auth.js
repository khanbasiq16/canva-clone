"use server"

import { signIn } from "@/auth";


export async function signinuser() {
    
  await signIn("google", { callbackUrl: "/" });
}