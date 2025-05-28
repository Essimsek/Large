import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="bg-white text-black p-4 rounded-lg mx-auto">
            <nav className='flex justify-between items-center px-4'>
                <Link href="/" className="text-2xl font-bold">
                    Logo here
                </Link>
                <div className='flex flex-row gap-4'>

                </div>
            </nav>
        </header>
    );
}

export default Navbar;
