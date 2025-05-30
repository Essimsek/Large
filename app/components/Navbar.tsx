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
        <header className="text-black p-2 rounded-lg mx-auto bg-white shadow-sm">
            <nav className='flex justify-between items-center px-4'>
                <Link href="/" className="text-2xl font-bold p-3">
                    Logo here
                </Link>
                <div className='flex flex-row gap-4'>
                    {session && session?.user ? (
                        <div className="flex flex-row gap-2 items-center">
                            <p>{session.user.name}</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className='cursor-pointer'>
                                    <Image 
                                        src={session.user.image || '/default-avatar.png'}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-2"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
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
