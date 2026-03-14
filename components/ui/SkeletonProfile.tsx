"use client";

import { Skeleton } from "./skeleton";
import SkeletonList from "./SkeletonList";

export default function SkeletonProfile() {
    return (
        <>
            {/* Profile header */}
            <div className="red-container pattern">
                <Skeleton className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/20" />
                <div className="text-center mt-6 space-y-3">
                    <Skeleton className="h-10 w-48 mx-auto bg-white/20 rounded-xl" />
                    <Skeleton className="h-4 w-72 mx-auto bg-white/20 rounded-lg" />
                </div>
                <div className="mt-6 flex gap-6">
                    <Skeleton className="h-3.5 w-28 bg-white/20 rounded" />
                    <Skeleton className="h-3.5 w-28 bg-white/20 rounded" />
                </div>
            </div>

            {/* Posts */}
            <section className="px-6 py-12 mx-auto max-w-7xl">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="w-12 h-1 rounded-full mb-4" />
                <SkeletonList range={3} />
            </section>
        </>
    );
}
