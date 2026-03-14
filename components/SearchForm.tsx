import Form from 'next/form'
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import SeachFormReset from './SeachFormReset';

const SearchForm = ({ query }: { query?: string }) => {
    return (
    <Form action="/" name="search" scroll={false} className="relative mt-8 flex justify-center items-center gap-2">
        <Input
            type="text"
            name="query"
            autoComplete="off"
            defaultValue={query}
            placeholder="Search posts, categories, authors..."
            className="w-[280px] sm:w-sm md:w-md lg:w-lg bg-white/95 dark:bg-white/10 dark:text-white p-6 pr-15 box-border rounded-2xl lg:text-xl md:text-lg text-base font-medium shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-white/50 placeholder:text-gray-400 dark:placeholder:text-white/40 backdrop-blur-sm transition-shadow duration-200"
        />
        {query && <SeachFormReset />}
        <Button variant="default" type="submit" className="rounded-xl h-12 w-12 bg-black dark:bg-white dark:text-black shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            <Search size={18} />
        </Button>
    </Form>
    );
}

export default SearchForm;
