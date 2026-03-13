"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen justify-center items-center red-container pattern">
            <Header title="Something went wrong" />
            <p className="font-semibold text-white text-center mt-4">
                {error.message || "Could not load this profile."}
            </p>
            <Button variant="secondary" onClick={reset} className="mt-4">
                Try Again
            </Button>
        </div>
    );
}
