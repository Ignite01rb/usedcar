"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Application Error</h2>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            A critical error occurred in the root layout.
          </p>
          <Button onClick={() => reset()}>Reload Page</Button>
        </div>
      </body>
    </html>
  );
}
