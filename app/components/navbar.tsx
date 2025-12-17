'use client';
import { SignIn, SignInButton, SignUpButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'

function Navbar() {
    const { isSignedIn, user, isLoaded } = useUser()
    return (
        <div> {!isSignedIn ? <div> <SignInButton />  <SignUpButton />  </div> : <SignOutButton />}</div>
    )
}

export default Navbar