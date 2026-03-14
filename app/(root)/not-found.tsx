import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] justify-center items-center red-container pattern">
      <Header title="404 — Page Not Found" />
      <p className="font-medium text-white/90 text-center mt-5 text-lg max-w-md">
          The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild variant="secondary" className="mt-6 rounded-full px-6 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
            <Home size={16} />
            Go back to Home
        </Link>
      </Button>
    </div>
  );
}
