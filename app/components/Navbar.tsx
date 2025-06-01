import React from 'react';
import Link from 'next/link';
import SignIn from './sign-in';
import SignOut from './sign-out';
import { auth } from '@/auth'
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

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
                            <Link href="/startup">Startup</Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className='cursor-pointer'>
                                    <Image 
                                        src={session.user.image || '/default-avatar.png'}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-2 hover:scale-105 transition-all"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
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
