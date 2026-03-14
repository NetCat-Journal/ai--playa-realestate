'use client';
import { useState } from "react";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { translations } from '../lib/translations';

function Navbar() {
    const { isSignedIn } = useUser();
    const [language, setLanguage] = useState<'en' | 'es'>('en');
    const t = translations[language].navbar;

    return (
        <div className=" z-50 fixed top-0 left-0 right-0 bg-gradient-to-r from-white/60 to-transparent backdrop-blur-md p-4 flex justify-between items-center">
            <div><img src="/img/logo1.png" alt="logo" className="h-6  w-auto" /></div>

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
            <div className="hidden md:flex flex-row justify-center items-center space-x-4">
                <a href="#home" className="font-medium text-[#0A1628] hover:text-white/80">{t.home}</a>
                <a href="#properties" className="font-medium text-[#0A1628] hover:text-white/80 transition-all">{t.properties}</a>
                <a href="#services" className="font-medium text-[#0A1628] hover:text-white/80]">{t.services}</a>
                <a href="#about" className="font-medium text-[#0A1628] hover:text-white/80">{t.about}</a>
                <a href="#contact" className="font-medium text-[#0A1628] hover:text-white/80">{t.contact}</a>
                <div className="flex gap-4">
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button className="px-6 py-2 font-medium text-[#0A1628] hover:text-[#D4AF37] transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>

                            <SignUpButton mode="modal">
                                <motion.button whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }} className="px-6 py-3 font-medium rounded-lg shadow-lg transition-all bg-gradient-to-r from-[#E8D88E] to-[#C19A2E]">
                                    Sign Up
                                </motion.button>
                            </SignUpButton>
                        </>
                    ) : (
                        <SignOutButton>
                            <button className="px-4 py-2 bg-[#2688BA] text-white rounded hover:bg-red-700 transition">
                                Sign Out
                            </button>
                        </SignOutButton>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Navbar