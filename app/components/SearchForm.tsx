import Form from 'next/form'
import { Input } from './ui/input';
import { searchAction } from './actions';

const SearchForm = () => {
    return (
    <Form action={searchAction} className="relative mt-8 flex justify-center">
        <Input
            type="text"
            name="query"
            placeholder="Search"
            className="w-[260px] sm:w-sm md:w-md lg:w-lg bg-white p-6 rounded-full lg:text-2xl md:text-xl text-lg font-semibold"
        />
    </Form>
    );
}

export default SearchForm;
