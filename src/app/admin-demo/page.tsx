"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDemoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard
    router.push("/admin/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Admin Dashboard...</h1>
        <p className="text-gray-600">Please wait while we load the admin interface.</p>
      </div>
    </div>
  );
}
