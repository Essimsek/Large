"use client";

import { Skeleton } from "./skeleton";
import SkeletonList from "./SkeletonList";

export default function SkeletonProfile() {
    return (
        <>
            {/* Profile header */}
            <div className="red-container pattern">
                <Skeleton className="w-48 h-48 rounded-full bg-white/20" />
                <div className="text-center mt-6 space-y-3">
                    <Skeleton className="h-8 w-48 mx-auto bg-white/20" />
                    <Skeleton className="h-4 w-64 mx-auto bg-white/20" />
                </div>
                <div className="mt-4 space-y-2">
                    <Skeleton className="h-3 w-32 mx-auto bg-white/20" />
                    <Skeleton className="h-3 w-32 mx-auto bg-white/20" />
                </div>
            </div>

            {/* Posts section */}
            <section className="px-6 py-10 mx-auto max-w-7xl">
                <Skeleton className="h-8 w-48 mb-4" />
                <SkeletonList range={3} />
            </section>
        </>
    );
}
