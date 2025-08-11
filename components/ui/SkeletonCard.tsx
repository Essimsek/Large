// components/SkeletonCard.tsx
import { Skeleton } from "./skeleton";

export default function SkeletonCard() {
  return (
    <div className="max-w-2xl w-full bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 my-6">
      
      {/* Header */}
      <div className="flex justify-between mb-3">
        <div className="flex p-1 items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="md:col-span-1">
          <Skeleton className="w-full h-32" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-300">
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
