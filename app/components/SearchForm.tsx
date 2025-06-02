import React from 'react';
import Form from 'next/form'
import { Input } from './ui/input';

const SearchForm = () => {
    const handleSubmit = async (formData: FormData) => {
        'use server';
        const query = formData.get('query');
        console.log('Search query:', query);
    }
    return (
    <Form action={handleSubmit} className="relative mt-8 flex justify-center">
        <Input
            type="text"
            name="query"
            placeholder="Search"
            className="w-[280px] sm:w-sm md:w-md lg:w-lg bg-white p-6 rounded-full"
        />
    </Form>
    );
}

export default SearchForm;
