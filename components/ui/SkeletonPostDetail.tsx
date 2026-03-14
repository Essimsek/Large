"use client";

import { Skeleton } from "./skeleton";

export default function SkeletonPostDetail() {
    return (
        <>
            {/* Header */}
            <section className="red-container pattern">
                <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
                    <Skeleton className="h-12 w-2/3 bg-white/20 rounded-xl" />
                    <Skeleton className="h-7 w-24 rounded-full mt-5 bg-white/20" />
                    <Skeleton className="h-5 w-3/4 mt-5 bg-white/20 rounded-lg" />
                </div>
            </section>

            {/* Author bar */}
            <section className="max-w-4xl mx-auto px-5 mt-8 mb-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-11 h-11 rounded-full" />
                    <div>
                        <Skeleton className="h-4 w-28 mb-1.5" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="h-6 w-px bg-border ml-2" />
                    <div className="flex gap-5">
                        <div>
                            <Skeleton className="h-3 w-16 mb-1" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div>
                            <Skeleton className="h-3 w-16 mb-1" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-px w-full mt-6" />
            </section>

            {/* Image */}
            <section className="max-w-4xl mx-auto px-5 mt-6">
                <Skeleton className="w-full h-72 rounded-2xl" />
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto px-5 py-10 space-y-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-9/12 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
            </section>
        </>
    );
}
