import React from 'react';
import Link from 'next/link';
import SignIn from './auth-comp/sign-in';
import SignOut from './auth-comp/sign-out';
import { auth } from '@/auth'
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="text-black p-1 mb-0 rounded-lg mx-auto bg-white shadow-md w-full max-w-8xl">
            <nav className='flex justify-between items-center px-4'>
                <Link href="/">
                    <Image 
                        src="/Website-Logo-removebg.png"
                        alt="Logo"
                        width={60}
                        height={55}
                        className="p-0 m-0 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out"    
                    />
                </Link>
                <div className='flex flex-row gap-4'>
                    {session && session?.user ? (
                        <div className="flex flex-row gap-2 items-center">
                            <Link href="/new-post">Create</Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Image 
                                        src={session.user.image || '/default-avatar.png'}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-2 hover:scale-105 transition-all"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='border-none mr-4 bg-black/80 text-white font-medium'>
                                    <DropdownMenuItem>
                                        settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className='focus:bg-red-400'>
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
