import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-bold mb-2">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-6 text-sm">
        Could not find the requested resource.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
