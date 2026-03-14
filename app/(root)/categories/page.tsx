import { client } from "@/sanity/lib/client";
import { GET_ALL_CATEGORIES, GET_TOTAL_POSTS_BY_CATEGORY } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";

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
                <p className="font-medium text-white/90 text-center mt-5 text-lg">
                    Browse posts by topic
                </p>
            </section>

            <section className="px-6 py-12 mx-auto max-w-7xl">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-foreground text-3xl font-bold tracking-tight">All Categories</h2>
                    <span className="text-sm text-muted-foreground mt-1">({categoriesWithCounts.length})</span>
                </div>
                <div className="w-12 h-1 bg-red-400 rounded-full mb-8" />

                {categoriesWithCounts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {categoriesWithCounts.map(({ name, count }) => (
                            <Link
                                key={name}
                                href={`/categories/${encodeURIComponent(name)}`}
                                className="group flex items-center justify-between p-5 bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10">
                                        <FolderOpen size={18} className="text-red-500" />
                                    </div>
                                    <span className="font-bold text-lg group-hover:text-red-500 transition-colors">{name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-yellow-400/90 dark:bg-yellow-500/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                                        {count}
                                    </span>
                                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-red-500 group-hover:translate-x-0.5 transition-all duration-200" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-12">No categories found.</p>
                )}
            </section>
        </>
    );
}
