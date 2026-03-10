'use client';
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

function Navbar() {
    const { isSignedIn } = useUser()

    return (
        <div className="flex flex-row justify-between items-center w-full bg-white/80 p-4 z-10">
            <div><img src="/img/logo.png" alt="logo" className="w-60 h-20" /></div>

            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>This action cannot be undone.</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:flex flex-row">
                {!isSignedIn ? (
                    <div className="flex gap-4">
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 bg-[#2688BA] text-white border-2 border-[#2688BA] rounded hover:bg-white hover:text-[#2688BA] transition">
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <button className="px-4 py-2 border-2 border-[#2688BA] text-[#2688BA] rounded hover:bg-[#2688BA] hover:text-white transition">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                ) : (
                    <SignOutButton>
                        <button className="px-4 py-2 bg-[#2688BA] text-white rounded hover:bg-red-700 transition">
                            Sign Out
                        </button>
                    </SignOutButton>
                )}
            </div>
        </div>
    )
}

export default Navbar