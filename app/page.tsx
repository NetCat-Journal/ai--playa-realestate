'use client';
import { SignIn, SignInButton, SignUpButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'
import Navbar from "./components/navbar";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <h1>playa</h1>
      {isSignedIn && isLoaded && user && (
        <h1>
          Welcome, {user.firstName}!
        </h1>
      )}
    </div>
  );
}
