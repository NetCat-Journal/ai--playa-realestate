'use client';
import { SignIn, SignInButton, SignUpButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs'

function Navbar() {
    const { isSignedIn, user, isLoaded } = useUser()
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <div>Logo</div>
            <div> {!isSignedIn ? <div> <SignInButton />  <SignUpButton />  </div> : <SignOutButton />}</div>
        </div>
    )
}

export default Navbar