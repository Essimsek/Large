import Form from 'next/form'
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import SeachFormReset from './SeachFormReset';

const SearchForm = ({ query }: { query?: string }) => {
    return (
    <Form action="/" name="search" scroll={false} className="relative mt-8 flex justify-center items-center gap-1">
        <Input
            type="text"
            name="query"
            autoComplete="off"
            defaultValue={query}
            placeholder="Search"
            className="w-[260px] sm:w-sm md:w-md lg:w-lg bg-white p-6 pr-15 box-border rounded-full lg:text-2xl md:text-xl text-lg font-semibold"
        />
        {query && <SeachFormReset />} 
        <Button variant="default" type="submit" className="rounded-lg scale-110"> 
            <Search />
        </Button>
    </Form>
    );
}

export default SearchForm;
