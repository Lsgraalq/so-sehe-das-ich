// lib/auth-actions.ts
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export async function logout() {
  try {
    await signOut(auth);
    // например, редирект на /login:
    window.location.href = "de/sign-in";
  } catch (e) {
    console.error(e);
    alert("Error! Try again");
  }
}
