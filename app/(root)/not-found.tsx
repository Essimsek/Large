import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen justify-center items-center red-container pattern">
      <Header title="404 - Page Not Found" />
      <p className="font-semibold text-white text-center mt-4">The page you are looking for does not exist.</p>
      <Button asChild variant="secondary">
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}