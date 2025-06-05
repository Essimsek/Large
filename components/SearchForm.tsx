"use client";
import Form from 'next/form'
import { Input } from './ui/input';
import { searchAction } from './actions';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';

const SearchForm = () => {
    const [query, setQuery] = useState("");
    return (
    <Form action={searchAction} className="relative mt-8 flex justify-center items-center gap-1">
        <Input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            placeholder="Search"
            className="w-[260px] sm:w-sm md:w-md lg:w-lg bg-white p-6 pr-14 box-border rounded-full lg:text-2xl md:text-xl text-lg font-semibold"
        />
        {query && (
            <>
                <Button type="button" onClick={() => setQuery('')} className='absolute right-11 top-1/2 -translate-1/2 bg-gray-200 hover:bg-red-400 text-gray-500 hover:text-gray-700 p-1 rounded-full transition-colors duration-150'>
                    <X />
                </Button>
            </>
        )}
        <Button variant="default" type="submit" className="rounded-lg"> 
            <Search />
        </Button>
    </Form>
    );
}

export default SearchForm;
