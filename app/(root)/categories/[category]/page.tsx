import { client } from "@/sanity/lib/client";
import { GET_POSTS_BY_CATEGORY, GET_TOTAL_POSTS_BY_CATEGORY } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import MyPagination from "@/components/Pagination";
import type { Post } from "@/sanity.types";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const POSTS_PER_PAGE = 6;

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { category } = await params;
    const { page } = await searchParams;
    const decodedCategory = decodeURIComponent(category);
    const pageNumber = page ? Number(page) : 1;

    const totalPosts: number = await client.fetch(GET_TOTAL_POSTS_BY_CATEGORY, {
        category: decodedCategory,
    });
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    if ((pageNumber > totalPages && totalPages > 0) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
        redirect(`/categories/${category}?page=1`);
    }

    const start = (pageNumber - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    const posts: Post[] = await client.fetch(GET_POSTS_BY_CATEGORY, {
        category: decodedCategory,
        start,
        end,
    });

    return (
        <>
            <section className="red-container pattern">
                <Header title={decodedCategory} />
                <p className="font-medium text-white/90 text-center mt-5 text-lg">
                    {totalPosts} {totalPosts === 1 ? "post" : "posts"} in this category
                </p>
            </section>

            <section className="px-6 py-12 mx-auto max-w-7xl">
                <Link
                    href="/categories"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors mb-6"
                >
                    <ArrowLeft size={14} />
                    All Categories
                </Link>

                {posts?.length > 0 ? (
                    <ul className="grid-card-area">
                        {posts.map((post: Post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-muted-foreground py-12">No posts in this category.</p>
                )}

                <MyPagination pageCount={totalPages} />
            </section>
        </>
    );
}
