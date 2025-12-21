'use client';
import { SignIn, SignInButton, SignUpButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import PublicPage from "./public/page";


export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <div className="w-full h-screen">
      <div className="max-w-7xl p-8 flex flex-col justify-center items-center m-auto">
        <Navbar />
        {isSignedIn && isLoaded && user && (
          <h1>
            Welcome, {user.firstName}!
          </h1>
        )}
        <Hero />
        <PublicPage />
      </div>
    </div>

  );
}
