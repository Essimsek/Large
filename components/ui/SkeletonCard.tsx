"use client";
import { Skeleton } from "./skeleton";

export default function SkeletonCard() {
  return (
    <div className="max-w-2xl w-full bg-card rounded-2xl border border-border/60 shadow-sm p-6 my-3">

      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-9 h-9 rounded-full" />
          <div>
            <Skeleton className="h-3.5 w-24 mb-1.5" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Skeleton className="h-5 w-3/4 mb-3" />
          <Skeleton className="h-3.5 w-full mb-2" />
          <Skeleton className="h-3.5 w-5/6 mb-2" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
        <div className="md:col-span-1">
          <Skeleton className="w-full h-28 rounded-xl" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-border/50">
        <div className="flex space-x-4">
          <Skeleton className="h-3.5 w-10" />
          <Skeleton className="h-3.5 w-10" />
        </div>
        <Skeleton className="h-3.5 w-20" />
      </div>
    </div>
  );
}
