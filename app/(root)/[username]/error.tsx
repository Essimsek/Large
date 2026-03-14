"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[80vh] justify-center items-center red-container pattern">
            <Header title="Something went wrong" />
            <p className="font-medium text-white/90 text-center mt-5 text-lg max-w-md">
                {error.message || "Could not load this profile."}
            </p>
            <Button variant="secondary" onClick={reset} className="mt-6 rounded-full px-6 shadow-lg flex items-center gap-2">
                <RefreshCw size={16} />
                Try Again
            </Button>
        </div>
    );
}
