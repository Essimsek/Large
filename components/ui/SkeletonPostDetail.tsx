"use client";

import { Skeleton } from "./skeleton";

export default function SkeletonPostDetail() {
    return (
        <>
            {/* Header area */}
            <section className="red-container pattern">
                <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
                    <Skeleton className="h-10 w-2/3 bg-white/20" />
                    <Skeleton className="h-6 w-20 rounded-full mt-4 bg-white/20" />
                    <Skeleton className="h-5 w-3/4 mt-4 bg-white/20" />
                </div>
            </section>

            {/* Author bar */}
            <section className="max-w-4xl mx-auto px-5 mt-6 mb-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                        <Skeleton className="h-4 w-28 mb-1" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                    <div>
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div>
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <Skeleton className="h-px w-full mt-4" />
            </section>

            {/* Image placeholder */}
            <section className="max-w-4xl mx-auto px-5 mt-8">
                <Skeleton className="w-full h-64 rounded-2xl" />
            </section>

            {/* Content lines */}
            <section className="max-w-3xl mx-auto px-5 py-10 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-9/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </section>
        </>
    );
}
