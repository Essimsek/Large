import { client } from "@/sanity/lib/client";
import { GET_ALL_CATEGORIES, GET_TOTAL_POSTS_BY_CATEGORY } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import Link from "next/link";

export default async function CategoriesPage() {
    const categories: string[] = await client.fetch(GET_ALL_CATEGORIES);

    const categoriesWithCounts = await Promise.all(
        (categories ?? []).filter(Boolean).map(async (category) => ({
            name: category,
            count: await client.fetch(GET_TOTAL_POSTS_BY_CATEGORY, { category }),
        }))
    );

    categoriesWithCounts.sort((a, b) => b.count - a.count);

    return (
        <>
            <section className="red-container pattern">
                <Header title="Categories" />
                <p className="font-semibold text-white text-center mt-4 text-lg">
                    Browse posts by topic
                </p>
            </section>

            <section className="px-6 py-10 mx-auto max-w-7xl">
                {categoriesWithCounts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {categoriesWithCounts.map(({ name, count }) => (
                            <Link
                                key={name}
                                href={`/categories/${encodeURIComponent(name)}`}
                                className="flex items-center justify-between p-5 bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                <span className="font-bold text-lg">{name}</span>
                                <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 border border-black">
                                    {count} {count === 1 ? "post" : "posts"}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No categories found.</p>
                )}
            </section>
        </>
    );
}
