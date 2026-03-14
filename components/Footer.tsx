import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Website-Logo-removebg.png"
                alt="Large Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Large</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Think Large. Write Larger. A platform for thinkers, creators, and storytellers.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/new-post" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Write a Post
              </Link>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Keyboard Shortcuts</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Ctrl+K</kbd>
                <span>Command palette</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">T</kbd>
                <span>Toggle theme</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Large. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for writers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
