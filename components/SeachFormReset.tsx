"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const SeachFormReset = () => {

    const handleReset = () => {
        const searchForm: HTMLFormElement | null = document.querySelector('form[name="search"]')
        if (searchForm) {
            searchForm.reset();
        }
    };

    return (
        <Button type="reset" onClick={handleReset} asChild className='absolute right-11 top-1/2 -translate-1/2 bg-muted hover:bg-red-400 text-muted-foreground hover:text-white p-1 rounded-full transition-colors duration-200'>
            <Link href="/" className="p-1.5">
                <X />
            </Link>
        </Button>
    );
}

export default SeachFormReset;
