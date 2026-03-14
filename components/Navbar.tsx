import React from 'react';
import Link from 'next/link';
import SignIn from './auth-comp/sign-in';
import SignOut from './auth-comp/sign-out';
import { auth } from '@/auth'
import Image from 'next/image';
import { PenLine } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from './ThemeToggle';
import CmdKButton from './CmdKButton';

const Navbar = async () => {
    const session = await auth();
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 transition-all duration-300">
            <nav className='flex justify-between items-center px-6 py-2 max-w-7xl mx-auto'>
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/Website-Logo-removebg.png"
                        alt="Logo"
                        height={48}
                        width={48}
                        className="p-0 m-0 rounded-full hover:scale-110 transition-transform duration-300 ease-out"
                    />
                </Link>
                <div className='flex flex-row gap-3 items-center'>
                    <CmdKButton />
                    <ThemeToggle />
                    {session && session?.user ? (
                        <div className="flex flex-row gap-3 items-center">
                            <Link
                                href="/new-post"
                                className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <PenLine size={14} />
                                Create
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Image
                                        src={session.user.image || '/default-avatar.png'}
                                        alt="User Avatar"
                                        width={38}
                                        height={38}
                                        className="rounded-full cursor-pointer ring-2 ring-transparent hover:ring-red-400 transition-all duration-200"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='border border-border/50 mr-4 bg-popover/95 backdrop-blur-xl text-popover-foreground font-medium rounded-xl shadow-xl'>
                                    <DropdownMenuItem asChild>
                                        <Link href={"/" + session?.user?.username} className="rounded-lg">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className='focus:bg-red-500/10 focus:text-red-600 rounded-lg'>
                                        <SignOut />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <SignIn />
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
