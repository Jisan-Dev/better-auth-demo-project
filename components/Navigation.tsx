"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };

  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Better-Auth Demo</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm text-gray-600 font-medium transition-colors hover:text-indigo-600 hover:bg-indigo-50 ${
                isActive("/") && "bg-indigo-600 text-white"
              }`}>
              Home
            </Link>

            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 ${
                isActive("/dashboard") && "bg-indigo-600 text-white"
              }`}>
              Dashboard
            </Link>

            {isPending ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : session ? (
              <button
                onClick={handleSignout}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 ${
                  isActive("/auth") && "bg-indigo-600 text-white"
                }`}>
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 ${
                  isActive("/auth") && "bg-indigo-600 text-white"
                }`}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
